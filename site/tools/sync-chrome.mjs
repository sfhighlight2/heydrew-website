#!/usr/bin/env node
/* Copies the shared chrome (sprite, header + menu sheet, footer, exit sheet + sticky CTA)
   from _template.html into every page of the site, so the markup has one source.

   usage (from site/):  node tools/sync-chrome.mjs [--check] [file.html ...]

   For each page it:
     - replaces everything between <!-- chrome:NAME --> and <!-- /chrome:NAME -->
       with the same block from _template.html (blocks a page lacks are left alone,
       so a page can opt out of e.g. the overlays by removing the markers);
     - prefixes relative href/src values in those blocks with the page's data-root
       ("../" for product/, solutions/, company/ pages);
     - sets ?src=<data-page> on TaxLand and contact links (site.js does this at
       runtime too; this keeps no-JS links right);
     - marks the current page: aria-current="page" on links whose data-slug equals
       data-page, and .is-current on its dropdown trigger.
   --check reports pages whose chrome is out of date without writing (exit code 1). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOCKS = ['sprite', 'header', 'footer', 'overlays'];
const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const tpl = fs.readFileSync(path.join(SITE, '_template.html'), 'utf8');

const re = name => new RegExp(`<!-- chrome:${name} -->[\\s\\S]*?<!-- /chrome:${name} -->`);
const source = {};
for (const b of BLOCKS) { const m = tpl.match(re(b)); if (!m) throw new Error(`_template.html is missing chrome:${b}`); source[b] = m[0]; }

function pages() {
  const out = [];
  const walk = dir => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) { if (!['assets', 'img', 'shots', 'tools', 'node_modules'].includes(f.name) && !f.name.startsWith('.')) walk(p); }
      else if (f.name.endsWith('.html') && f.name !== '_template.html' && !/backup/.test(f.name)) out.push(p);
    }
  };
  walk(SITE); return out;
}

/* Which dropdown each page lives in (SITEMAP.md). */
const GROUPS = {
  product: ['how-it-works', 'taxland', 'tax-valet', 'bookkeeping-payroll', 'pricing'],
  solutions: ['s-corp-owners', 'self-employed', 'real-estate-investors', 'families', 'strategies'],
  company: ['about', 'careers', 'affiliates', 'contact', 'security'],
};

const isRelative = v => v && !/^(?:[a-z][a-z0-9+.-]*:|#|\/|\.\.\/|data:)/i.test(v);

function localize(block, root, slug) {
  let s = block;
  if (root) s = s.replace(/\s(href|src)="([^"]*)"/g, (m, attr, v) => isRelative(v) ? ` ${attr}="${root}${v}"` : m);
  s = s.replace(/(https:\/\/(?:taxland\.heydrew\.com|heydrew\.com\/contact)\/\?src=)[a-z0-9-]+/g, `$1${slug}`);
  // current page
  s = s.replace(/\saria-current="page"/g, '').replace(/\sis-current/g, '');
  s = s.replace(/(<a\b[^>]*\bdata-slug="([^"]+)"[^>]*)>/g, (m, open, sl) => sl === slug ? `${open} aria-current="page">` : m);
  // group triggers: the dropdown that holds the current page
  const group = Object.keys(GROUPS).find(g => GROUPS[g].includes(slug));
  if (group) s = s.replace(new RegExp(`class="(nav-top|sm-top)"([^>]*data-group="${group}")`, 'g'), 'class="$1 is-current"$2');
  return s;
}

let stale = 0;
const targets = args.filter(a => a.endsWith('.html')).map(a => path.resolve(a));
for (const file of (targets.length ? targets : pages())) {
  let html = fs.readFileSync(file, 'utf8');
  const body = html.match(/<body\b([^>]*)>/);
  const attr = n => { const m = body && body[1].match(new RegExp(`${n}="([^"]*)"`)); return m ? m[1] : null; };
  const slug = attr('data-page') || 'home';
  const depth = path.relative(SITE, path.dirname(file)).split(path.sep).filter(Boolean).length;
  const want = '../'.repeat(depth);
  const root = attr('data-root') ?? '';
  if (root !== want) console.warn(`! ${path.relative(SITE, file)}: data-root="${root}" but the file is ${depth} folder(s) deep (expected "${want}")`);
  let next = html;
  for (const b of BLOCKS) if (re(b).test(next)) next = next.replace(re(b), localize(source[b], want, slug));
  if (next !== html) {
    stale++;
    if (CHECK) console.log(`stale  ${path.relative(SITE, file)}`);
    else { fs.writeFileSync(file, next); console.log(`synced ${path.relative(SITE, file)}  (page=${slug}, root="${want}")`); }
  }
}
if (!stale) console.log('all pages up to date');
if (CHECK && stale) process.exit(1);
