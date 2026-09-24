#!/usr/bin/env node
/* =============================================================================
   HeyDrew production build: site/ (relative .html sources) -> dist/ (clean URLs)

   usage (from site/):  node tools/build.mjs [--out ../dist] [--origin https://heydrew.com]

   What it does
     1. Writes every page in PAGES to dist/<clean-url>/index.html
        (product/pricing.html -> /product/pricing/, solutions/strategies.html -> /strategies/).
     2. Rewrites every relative href/src/srcset to a root-absolute URL:
        page links become clean URLs (/company/contact/?src=..), assets become /img/.., /assets/...
     3. In <head>: swaps Google Fonts for self-hosted DM Sans / DM Mono (inline @font-face +
        preload), and injects canonical, Open Graph, Twitter, icons, manifest and one JSON-LD
        @graph (Organization, WebSite, WebPage, BreadcrumbList, plus Service / WebApplication /
        Article / CollectionPage / FAQPage by page type). FAQPage is built from the Q&A that is
        visible on the page, so markup always matches content. Inline JSON-LD in sources is dropped.
     4. Generates 404.html, sitemap.xml, robots.txt, llms.txt, llms-full.txt, site.webmanifest,
        _redirects (Netlify / Cloudflare Pages) and vercel.json (same 301 map).
     5. Copies only the assets the pages reference (plus fonts, icons, downloads).
     6. Lints the output and exits 1 on errors: unique title (<=60) and description (<=155),
        one H1, canonical, broken internal links, sitemap = pages, banned claims.

   Zero dependencies: Node 18+. Sources stay untouched and keep working over file://.
   ============================================================================= */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const OUT = path.resolve(SITE, arg('--out', '../dist'));
const ORIGIN = arg('--origin', 'https://heydrew.com').replace(/\/$/, '');

/* ---------------------------------------------------------------------------
   1. Page manifest. url = production path (trailing slash). kind drives schema.
   --------------------------------------------------------------------------- */
const PAGES = [
  { src: 'index.html', url: '/', kind: 'home', pri: '1.0' },
  { src: 'product/how-it-works.html', url: '/product/how-it-works/', kind: 'service', service: 'Year-round tax planning', pri: '0.9' },
  { src: 'product/taxland.html', url: '/product/taxland/', kind: 'app', pri: '0.9' },
  { src: 'product/tax-valet.html', url: '/product/tax-valet/', kind: 'service', service: 'Dedicated year-round tax support (Tax Valet)', pri: '0.7' },
  { src: 'product/bookkeeping-payroll.html', url: '/product/bookkeeping-payroll/', kind: 'service', service: 'Bookkeeping and payroll for business owners', pri: '0.7' },
  { src: 'product/pricing.html', url: '/product/pricing/', kind: 'service', service: 'Tax strategy service pricing', pri: '0.8' },
  { src: 'solutions/s-corp-owners.html', url: '/solutions/s-corp-owners/', kind: 'service', service: 'Tax strategy for S-Corp owners', audience: 'S corporation owners', pri: '0.9' },
  { src: 'solutions/self-employed.html', url: '/solutions/self-employed/', kind: 'service', service: 'Tax strategy for self-employed and LLC owners', audience: 'Self-employed people and single-member LLC owners', pri: '0.9' },
  { src: 'solutions/real-estate-investors.html', url: '/solutions/real-estate-investors/', kind: 'service', service: 'Tax planning for real estate investors', audience: 'Business owners who hold real estate', pri: '0.9' },
  { src: 'solutions/families.html', url: '/solutions/families/', kind: 'service', service: 'Family tax strategies for business owners', audience: 'Business-owning families', pri: '0.8' },
  { src: 'solutions/strategies.html', url: '/strategies/', kind: 'collection', pri: '0.9' },
  { src: 'case-studies.html', url: '/case-studies/', kind: 'collection', pri: '0.7' },
  { src: 'resources.html', url: '/resources/', kind: 'collection', pri: '0.7' },
  { src: 'resources/guides.html', url: '/resources/guides/', kind: 'collection', pri: '0.7' },
  { src: 'resources/guide-proactive-tax-planning.html', url: '/resources/guides/proactive-tax-planning/', kind: 'article', pri: '0.8' },
  { src: 'resources/guide-first-call-checklist.html', url: '/resources/guides/first-call-checklist/', kind: 'article', pri: '0.7' },
  { src: 'resources/guide-records-that-hold-up.html', url: '/resources/guides/records-that-hold-up/', kind: 'article', pri: '0.8' },
  { src: 'resources/worksheets.html', url: '/resources/worksheets/', kind: 'worksheets', pri: '0.8' },
  { src: 'resources/faq.html', url: '/resources/faq/', kind: 'faq', pri: '0.8' },
  { src: 'company/about.html', url: '/company/about/', kind: 'about', pri: '0.7' },
  { src: 'company/careers.html', url: '/company/careers/', kind: 'page', pri: '0.4' },
  { src: 'company/affiliates.html', url: '/company/affiliates/', kind: 'page', pri: '0.4' },
  { src: 'company/contact.html', url: '/company/contact/', kind: 'contact', pri: '0.6' },
  { src: 'company/security.html', url: '/company/security/', kind: 'page', pri: '0.5' },
];
const BY_SRC = new Map(PAGES.map(p => [p.src, p]));
const TITLES = new Map(PAGES.map(p => [p.url, ((fs.readFileSync(path.join(SITE, p.src), 'utf8').match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/&amp;/g, '&').trim()]));
const inCrumbs = n => { for (let p = n.parent; p; p = p.parent) if (p.attrs && (cls(p).includes('crumbs') || cls(p).includes('crumbs-nav'))) return true; return false; };

/* Real publish dates, only once a page is live on heydrew.com (ISO 8601). Never backdate.
   e.g. 'resources/guide-proactive-tax-planning.html': { published: '2026-10-15', modified: '2026-10-15' } */
const DATES = {};

/* Legal pages keep their live paths. They are not in this prototype: migrate the real text
   to site/legal/<slug>.html (same chrome) and add them to PAGES before DNS moves. */
const LEGAL = ['privacy-policy', 'terms-of-use', 'engagement-terms', 'sms-terms', 'cookie-policy'];

/* 301 map: live WordPress URLs -> new URLs. */
const REDIRECTS = [
  ['/about-us', '/company/about/'], ['/about-us/', '/company/about/'],
  ['/how-it-works', '/product/how-it-works/'], ['/how-it-works/', '/product/how-it-works/'],
  ['/our-strategies', '/strategies/'], ['/our-strategies/', '/strategies/'],
  ['/why-we-are-different', '/product/how-it-works/'], ['/why-we-are-different/', '/product/how-it-works/'],
  ['/faq', '/resources/faq/'], ['/faq/', '/resources/faq/'],
  ['/careers', '/company/careers/'], ['/careers/', '/company/careers/'],
  ['/contact', '/company/contact/'], ['/contact/', '/company/contact/'],
  ['/affiliate', '/company/affiliates/'], ['/affiliate/', '/company/affiliates/'],
  ['/solutions/strategies', '/strategies/'], ['/solutions/strategies/', '/strategies/'],
  ['/terms-of-service', '/engagement-terms/'], ['/terms-of-service/', '/engagement-terms/'],
  ['/messaging-terms', '/sms-terms/'], ['/messaging-terms/', '/sms-terms/'],
  ['/lcookie-policy', '/cookie-policy/'], ['/legal/cookie-policy', '/cookie-policy/'], ['/legal/sms-terms', '/sms-terms/'],
  ['/wp-content/uploads/2026/07/HRA-Employment-Agreement.pdf', '/downloads/hra-employment-agreement.pdf'],
  ['/wp-content/uploads/2026/07/Augusta-Rule-Comparable-Worksheet.pdf', '/downloads/augusta-rule-comparable-worksheet.pdf'],
  ['/wp-content/uploads/2026/07/Accountable-Plan-Board-Resolution-Owner-Resolution.pdf', '/downloads/accountable-plan-board-resolution.pdf'],
  ['/wp-content/uploads/2026/07/HRA-Written-Plan-Document.pdf', '/downloads/hra-written-plan-document.pdf'],
  ['/sitemap_index.xml', '/sitemap.xml'], ['/page-sitemap.xml', '/sitemap.xml'], ['/post-sitemap.xml', '/sitemap.xml'],
  ['/feed', '/'], ['/feed/', '/'], ['/comments/feed/', '/'],
  ['/get-started', 'https://taxland.heydrew.com/', 302], ['/login', 'https://portal.heydrew.com/', 302],
  ['/index.html', '/'],
];

/* ---------------------------------------------------------------------------
   2. Entity data (no street address or phone, per the client).
   --------------------------------------------------------------------------- */
const ENTITY_SENTENCE = 'HeyDrew is a year-round tax strategy service for business owners. Software identifies the tax strategies an owner may qualify for, and licensed professionals help put them in place and file the return. HeyDrew is operated by Aspire Advisors LLC d/b/a HeyDrew! and was founded by Andrew Cordle.';
const ORG_ID = `${ORIGIN}/#organization`, SITE_ID = `${ORIGIN}/#website`, PERSON_ID = `${ORIGIN}/company/about/#andrew-cordle`;
const ORG = {
  '@type': 'Organization', '@id': ORG_ID, name: 'HeyDrew', alternateName: ['Hey Drew', 'HeyDrew!', 'Hey Drew!'],
  legalName: 'Aspire Advisors LLC', url: `${ORIGIN}/`,
  logo: { '@type': 'ImageObject', url: `${ORIGIN}/img/icons/heydrew-logo.png`, width: 695, height: 408 },
  image: `${ORIGIN}/img/og-default.jpg`, description: ENTITY_SENTENCE, slogan: 'AI-Driven, Human-Perfected.',
  founder: { '@id': PERSON_ID }, areaServed: { '@type': 'Country', name: 'United States' },
  knowsAbout: ['Tax planning', 'Tax strategy for business owners', 'S corporation taxation', 'Reasonable compensation for S corporation owners', 'Accountable plans', 'Augusta Rule (IRC Section 280A(g))', 'Solo 401(k) plans', 'Health savings accounts', 'Health reimbursement arrangements', 'Hiring family members in a business', 'Bookkeeping and payroll'],
  sameAs: ['https://www.instagram.com/heydrewcpa/', 'https://www.linkedin.com/company/heydrew.com/'],
};
const PERSON = {
  '@type': 'Person', '@id': PERSON_ID, name: 'Andrew Cordle', jobTitle: 'Founder', worksFor: { '@id': ORG_ID },
  image: `${ORIGIN}/img/pages/andrew-cordle.webp`, sameAs: ['https://www.linkedin.com/in/andrewcordle/'],
};
const WEBSITE = { '@type': 'WebSite', '@id': SITE_ID, url: `${ORIGIN}/`, name: 'HeyDrew', publisher: { '@id': ORG_ID }, inLanguage: 'en-US' };

/* ---------------------------------------------------------------------------
   3. Tiny HTML parser (enough for our own well-formed pages).
   --------------------------------------------------------------------------- */
const VOID = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
const RAW = new Set(['script', 'style']);
function parse(html) {
  const root = { tag: '#root', attrs: {}, children: [], parent: null };
  let cur = root, i = 0;
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*\/?>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m.index > i) cur.children.push({ text: html.slice(i, m.index), parent: cur });
    i = re.lastIndex;
    if (!m[1]) continue;
    const tag = m[1].toLowerCase();
    if (m[0][1] === '/') {
      let n = cur; while (n && n.tag !== tag) n = n.parent;
      if (n && n.parent) cur = n.parent;
      continue;
    }
    const attrs = {};
    m[2].replace(/([^\s=>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g, (_, k, a, b, c) => { attrs[k.toLowerCase()] = a ?? b ?? c ?? ''; });
    const el = { tag, attrs, children: [], parent: cur };
    cur.children.push(el);
    if (RAW.has(tag)) {
      const end = html.toLowerCase().indexOf(`</${tag}`, i);
      el.children.push({ text: html.slice(i, end), parent: el });
      i = end; re.lastIndex = end;
    } else if (!VOID.has(tag) && !m[0].endsWith('/>')) cur = el;
  }
  if (i < html.length) cur.children.push({ text: html.slice(i), parent: cur });
  return root;
}
const cls = n => (n.attrs && n.attrs.class ? n.attrs.class.split(/\s+/) : []);
function* walk(n) { for (const c of n.children || []) { yield c; if (c.tag) yield* walk(c); } }
const find = (n, pred) => { for (const c of walk(n)) if (c.tag && pred(c)) return c; return null; };
const findAll = (n, pred) => [...walk(n)].filter(c => c.tag && pred(c));
const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&sect;/g, '§').replace(/&hellip;/g, '…').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));
const hiddenish = n => n.attrs && (n.attrs['aria-hidden'] === 'true' || n.tag === 'svg' || n.tag === 'script' || n.tag === 'style' || n.tag === 'template' || cls(n).includes('qn'));
function text(n, skipHidden = true) {
  if (n.text !== undefined) return n.text;
  if (skipHidden && hiddenish(n)) return '';
  const inner = (n.children || []).map(c => text(c, skipHidden)).join('');
  return /^(p|div|li|h[1-6]|br|tr|td|th|dt|dd|section|article|figcaption|blockquote|summary)$/.test(n.tag) ? ` ${inner} ` : inner;
}
const clean = s => decode(s).replace(/\s+/g, ' ').replace(/\s+([.,;:!?])/g, '$1').trim();

/* ---------------------------------------------------------------------------
   4. URL rewriting.
   --------------------------------------------------------------------------- */
const posix = p => p.split(path.sep).join('/');
const isRel = v => v && !/^(?:[a-z][a-z0-9+.-]*:|#|\/|data:|\{)/i.test(v);
const usedAssets = new Set();
const warnings = [];
function mapUrl(v, srcFile) {
  if (!isRel(v)) {
    const m = v.match(/^https:\/\/heydrew\.com(\/[^?#]*)?([?#].*)?$/);
    if (m) { // absolute links to our own host that now live in dist
      const p = m[1] || '/'; const hit = PAGES.find(x => x.url === p);
      if (hit) return hit.url + (m[2] || '');
    }
    return v;
  }
  const [, pathPart, rest = ''] = v.match(/^([^?#]*)(.*)$/);
  if (!pathPart) return v;
  const resolved = posix(path.normalize(path.join(path.dirname(srcFile), pathPart)));
  if (resolved.endsWith('.html')) {
    const pg = BY_SRC.get(resolved);
    if (pg) return pg.url + rest;
    warnings.push(`${srcFile}: link to ${resolved}, which is not a built page`);
    return '/' + resolved + rest;
  }
  usedAssets.add(resolved);
  return '/' + resolved + rest;
}
function rewriteUrls(html, srcFile) {
  html = html.replace(/(\s(?:href|src|poster|data-src)=")([^"]*)"/g, (_, a, v) => `${a}${mapUrl(v, srcFile)}"`);
  html = html.replace(/(\ssrcset=")([^"]*)"/g, (_, a, v) => a + v.split(',').map(s => { const [u, d] = s.trim().split(/\s+/); return `${mapUrl(u, srcFile)}${d ? ' ' + d : ''}`; }).join(', ') + '"');
  html = html.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, v) => isRel(v) ? `url(${q}${mapUrl(v, srcFile)}${q})` : m);
  return html;
}

/* ---------------------------------------------------------------------------
   5. Head: fonts, meta, JSON-LD.
   --------------------------------------------------------------------------- */
const FONT_CSS = `@font-face{font-family:'DM Sans';font-style:normal;font-weight:400 800;font-display:swap;src:url(/assets/fonts/dm-sans-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'DM Sans';font-style:italic;font-weight:400;font-display:swap;src:url(/assets/fonts/dm-sans-italic-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'DM Mono';font-style:normal;font-weight:500;font-display:swap;src:url(/assets/fonts/dm-mono-500-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function extractFaq(main) {
  const out = [];
  for (const qa of findAll(main, n => cls(n).includes('qa'))) {
    const qn = find(qa, n => /^(h[2-4]|summary)$/.test(n.tag));
    const an = find(qa, n => cls(n).some(c => c === 'ans' || c === 'fqa-a'));
    if (!qn || !an) continue;
    const q = clean(text(qn)), a = clean(text(an));
    if (q && a && !out.some(x => x.q === q)) out.push({ q, a });
  }
  return out;
}
function breadcrumbs(doc, pg) {
  const ol = find(doc, n => n.tag === 'ol' && cls(n).includes('crumbs'));
  if (!ol || pg.url === '/') return null;
  const items = [];
  for (const li of ol.children.filter(c => c.tag === 'li')) {
    const a = find(li, n => n.tag === 'a');
    const name = clean(text(li));
    if (a) items.push({ name, url: ORIGIN + mapUrl(a.attrs.href, pg.src).replace(/[?#].*$/, '') });
    else if (li.attrs['aria-current'] === 'page') items.push({ name, url: ORIGIN + pg.url });
  }
  if (items.length < 2) return null;
  return { '@type': 'BreadcrumbList', '@id': `${ORIGIN}${pg.url}#breadcrumb`, itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })) };
}

function schemaFor(pg, doc, meta) {
  const url = ORIGIN + pg.url, main = find(doc, n => n.tag === 'main') || doc;
  const h1 = clean(text(find(main, n => n.tag === 'h1') || { children: [] }));
  const pageType = { home: 'WebPage', about: 'AboutPage', contact: 'ContactPage', collection: 'CollectionPage', worksheets: 'CollectionPage', faq: ['WebPage', 'FAQPage'], article: 'WebPage' }[pg.kind] || 'WebPage';
  const graph = [ORG, WEBSITE];
  const webpage = { '@type': pageType, '@id': `${url}#webpage`, url, name: meta.title, description: meta.desc, isPartOf: { '@id': SITE_ID }, about: { '@id': ORG_ID }, inLanguage: 'en-US', primaryImageOfPage: { '@type': 'ImageObject', url: meta.image } };
  const crumbs = breadcrumbs(doc, pg);
  if (crumbs) { webpage.breadcrumb = { '@id': crumbs['@id'] }; graph.push(crumbs); }
  graph.push(webpage);
  if (pg.kind === 'home' || pg.kind === 'about') graph.push(PERSON);
  if (pg.kind === 'about') webpage.mainEntity = { '@id': ORG_ID };
  if (pg.kind === 'contact') webpage.mainEntity = { '@id': ORG_ID };
  if (pg.kind === 'service') {
    const s = { '@type': 'Service', '@id': `${url}#service`, name: pg.service, serviceType: 'Tax planning', description: meta.desc, provider: { '@id': ORG_ID }, areaServed: { '@type': 'Country', name: 'United States' }, url };
    if (pg.audience) s.audience = { '@type': 'BusinessAudience', audienceType: pg.audience };
    graph.push(s); webpage.mainEntity = { '@id': s['@id'] };
  }
  if (pg.kind === 'home') {
    const s = { '@type': 'Service', '@id': `${url}#service`, name: 'Year-round tax strategy for business owners', serviceType: 'Tax planning', description: ENTITY_SENTENCE, provider: { '@id': ORG_ID }, areaServed: { '@type': 'Country', name: 'United States' }, audience: { '@type': 'BusinessAudience', audienceType: 'Business owners: S corporations, LLCs, the self-employed, real estate holders and families' } };
    graph.push(s);
  }
  if (pg.kind === 'app') graph.push({ '@type': 'WebApplication', '@id': `${url}#app`, name: 'TaxLand', url: 'https://taxland.heydrew.com/', applicationCategory: 'FinanceApplication', operatingSystem: 'Web browser', description: meta.desc, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, provider: { '@id': ORG_ID } });
  if (pg.kind === 'article') {
    const d = DATES[pg.src] || {};
    const art = { '@type': 'Article', '@id': `${url}#article`, headline: h1, description: meta.desc, image: meta.image, author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID }, mainEntityOfPage: { '@id': `${url}#webpage` }, inLanguage: 'en-US', isAccessibleForFree: true };
    if (d.published) art.datePublished = d.published;
    if (d.modified || d.published) art.dateModified = d.modified || d.published;
    const cites = [...new Set(findAll(main, n => n.tag === 'a' && /irs\.gov|law\.cornell\.edu|ecfr\.gov/.test(n.attrs.href || '')).map(a => a.attrs.href))];
    if (cites.length) art.citation = cites;
    graph.push(art);
  }
  if (pg.kind === 'collection' || pg.kind === 'worksheets') {
    const seen = new Set(), items = [];
    const links = pg.kind === 'worksheets'
      ? findAll(main, n => n.tag === 'a' && /\.pdf$/.test(n.attrs.href || ''))
      : pg.src === 'case-studies.html' ? [] : findAll(main, n => n.tag === 'a' && !inCrumbs(n) && PAGES.some(x => x.url !== '/' && (n.attrs.href || '').replace(/[?#].*$/, '') === x.url) && !/\/company\/contact\//.test(n.attrs.href || ''));
    for (const a of links) {
      const u = ORIGIN + mapUrl(a.attrs.href, pg.src).replace(/[?#].*$/, '');
      if (seen.has(u) || u === url || u === `${ORIGIN}/`) continue;
      seen.add(u);
      const name = (clean(text(find(a, n => /^(b|strong|h[2-4])$/.test(n.tag)) || a)) || TITLES.get(u.replace(ORIGIN, '')) || '').replace(/ \| HeyDrew$/, '').slice(0, 110);
      if (pg.kind === 'worksheets') items.push({ '@type': 'ListItem', position: items.length + 1, item: { '@type': 'DigitalDocument', name, url: u, encodingFormat: 'application/pdf', isAccessibleForFree: true, publisher: { '@id': ORG_ID } } });
      else if (pg.src.startsWith('resources') ? u.includes('/resources/') : true) items.push({ '@type': 'ListItem', position: items.length + 1, url: u, name });
    }
    if (pg.src === 'solutions/strategies.html') { // the hub lists its own strategy sections
      items.length = 0;
      for (const sec of findAll(main, n => n.tag === 'section' && cls(n).includes('sx') && n.attrs.id)) {
        const h = find(sec, n => n.tag === 'h2'); if (h) items.push({ '@type': 'ListItem', position: items.length + 1, url: `${url}#${sec.attrs.id}`, name: clean(text(h)) });
      }
    }
    if (items.length) { const list = { '@type': 'ItemList', '@id': `${url}#list`, itemListElement: items.slice(0, 30) }; graph.push(list); webpage.mainEntity = { '@id': list['@id'] }; }
  }
  const faq = extractFaq(main);
  if (faq.length) {
    const qs = faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }));
    if (pg.kind === 'faq') webpage.mainEntity = qs;
    else graph.push({ '@type': 'FAQPage', '@id': `${url}#faq`, isPartOf: { '@id': `${url}#webpage` }, mainEntity: qs });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function headTags(pg, meta, noindex) {
  const url = ORIGIN + pg.url;
  return [
    `<link rel="canonical" href="${url}">`,
    noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
    '<meta property="og:site_name" content="HeyDrew">',
    `<meta property="og:type" content="${pg.kind === 'article' ? 'article' : 'website'}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.desc)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${meta.image}">`,
    '<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="HeyDrew: year-round tax strategy for business owners">',
    '<meta property="og:locale" content="en_US">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.desc)}">`,
    `<meta name="twitter:image" content="${meta.image}">`,
    '<link rel="icon" href="/favicon.ico" sizes="48x48">',
    '<link rel="icon" href="/img/icons/favicon-32.png" type="image/png" sizes="32x32">',
    '<link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png">',
    '<link rel="manifest" href="/site.webmanifest">',
    '<link rel="preload" href="/assets/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>',
    `<style id="fonts">${FONT_CSS}</style>`,
  ].join('\n');
}

/* ---------------------------------------------------------------------------
   6. Markdown for llms-full.txt.
   --------------------------------------------------------------------------- */
function toMarkdown(n, srcFile) {
  const out = [];
  const inline = el => {
    if (el.text !== undefined) return decode(el.text).replace(/\s+/g, ' ');
    if (hiddenish(el) || el.tag === 'button' && !el.parent?.tag?.match(/^h[2-4]$/)) return el.tag === 'button' ? inline({ children: el.children, tag: 'span', attrs: {} }) : '';
    const inner = (el.children || []).map(inline).join('');
    if (el.tag === 'a' && el.attrs.href && !el.attrs.href.startsWith('#')) {
      let u = decode(mapUrl(el.attrs.href, srcFile)); if (u.startsWith('/')) u = ORIGIN + u;
      const t = inner.trim(); return t ? `[${t}](${u})` : '';
    }
    if (el.tag === 'b' || el.tag === 'strong') { const t = inner.trim(); return t ? `**${t}** ` : ''; }
    if (el.tag === 'br') return ' ';
    return inner;
  };
  const block = el => {
    if (el.text !== undefined) { const t = decode(el.text).trim(); if (t) out.push(t.replace(/\s+/g, ' ')); return; }
    if (hiddenish(el) || el.tag === 'form' || el.tag === 'nav' && cls(el).includes('crumbs-nav') || cls(el).includes('crumbs')) return;
    const t = () => inline(el).replace(/\s+/g, ' ').replace(/\*\*\s+([.,:;])/g, '**$1').trim();
    if (/^h[1-6]$/.test(el.tag)) { const s = t(); if (s) out.push(`\n${'#'.repeat(+el.tag[1])} ${s.replace(/\*\*/g, '')}\n`); return; }
    if (el.tag === 'p' || el.tag === 'figcaption' || el.tag === 'summary' || el.tag === 'dt' || el.tag === 'dd') { const s = t(); if (s) out.push(s + '\n'); return; }
    if (el.tag === 'li') { if (find(el, c => /^(p|h[2-6]|div|ul|ol)$/.test(c.tag))) { const before = out.length; el.children.forEach(block); const chunk = out.splice(before).join(' ').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim(); if (chunk) out.push(`- ${chunk}`); } else { const s = t(); if (s) out.push(`- ${s}`); } return; }
    if (el.tag === 'blockquote') { const s = t(); if (s) out.push(`> ${s}\n`); return; }
    if (el.tag === 'tr') { const cells = el.children.filter(c => c.tag === 'td' || c.tag === 'th').map(c => inline(c).replace(/\s+/g, ' ').trim()); out.push(`| ${cells.join(' | ')} |`); return; }
    if (el.tag === 'table') { el.children.forEach(block); out.push(''); return; }
    (el.children || []).forEach(block);
    if (/^(ul|ol|section|article|div)$/.test(el.tag)) out.push('');
  };
  block(n);
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/* ---------------------------------------------------------------------------
   7. Build.
   --------------------------------------------------------------------------- */
function rmrf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function write(rel, data) { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); }
function copy(rel) { const s = path.join(SITE, rel); if (!fs.existsSync(s)) { warnings.push(`missing asset ${rel}`); return; } const d = path.join(OUT, rel); fs.mkdirSync(path.dirname(d), { recursive: true }); fs.copyFileSync(s, d); }

rmrf(OUT); fs.mkdirSync(OUT, { recursive: true });
const built = [];      // { pg, meta, html, doc }
const DEFAULT_IMG = `${ORIGIN}/img/og-default.jpg`;

function buildPage(pg, htmlIn, { noindex = false } = {}) {
  let html = htmlIn;
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').trim();
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '').trim();
  const meta = { title, desc, image: DEFAULT_IMG };
  // drop inline JSON-LD, Google Fonts and their preconnects
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  html = html.replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.(?:googleapis|gstatic)\.com"[^>]*>/g, '');
  html = html.replace(/\s*<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">|\s*<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2[^"]*">/g, '');
  html = rewriteUrls(html, pg.src);
  html = html.replace(/(<body\b[^>]*\sdata-root=")[^"]*"/, '$1/"');
  const doc = parse(html);
  const ld = noindex ? null : schemaFor(pg, doc, meta);
  html = html.replace(/(<meta name="description"[^>]*>)/, `$1\n${headTags(pg, meta, noindex)}`);
  if (ld) html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n</head>`);
  return { pg, meta, html, doc: parse(html), noindex };
}

for (const pg of PAGES) {
  const src = fs.readFileSync(path.join(SITE, pg.src), 'utf8');
  const b = buildPage(pg, src);
  write(pg.url === '/' ? 'index.html' : pg.url.slice(1) + 'index.html', b.html);
  built.push(b);
}

/* 404 page: the template chrome with a short, helpful main. */
{
  let tpl = fs.readFileSync(path.join(SITE, '_template.html'), 'utf8');
  tpl = tpl.replace(/<!--\s*\n\s*={10,}[\s\S]*?={10,}\s*\n-->/, '');
  tpl = tpl.replace(/<title>[\s\S]*?<\/title>/, '<title>Page Not Found | HeyDrew</title>')
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="That page moved or no longer exists. Find tax strategies, guides and the free TaxLand assessment from here.">')
    .replace(/(<body\b[^>]*data-page=")[^"]*"/, '$1not-found"');
  const main404 = `<main id="main">
  <section class="ph" aria-labelledby="ph-h">
    <div class="stage ph-stage"><div class="ph-copy">
      <h1 class="ph-h1" id="ph-h"><span class="h1-kicker">Error 404<span class="sr-only">: </span></span> This page <span class="hl">moved</span>.</h1>
      <p class="lead">The page you asked for isn't here anymore. These are the places most people are looking for:</p>
      <ul class="lead" style="margin-top:18px;line-height:1.9">
        <li><a href="solutions/strategies.html">Tax strategies for business owners</a></li>
        <li><a href="product/how-it-works.html">How HeyDrew works</a></li>
        <li><a href="product/pricing.html">Pricing</a></li>
        <li><a href="resources.html">Resources, guides and worksheets</a></li>
        <li><a href="resources/faq.html">FAQ</a></li>
        <li><a href="company/contact.html">Contact HeyDrew</a></li>
      </ul>
      <div class="cta-row" style="margin-top:28px"><a class="btn btn--primary" href="https://taxland.heydrew.com/?src=not-found&amp;pos=hero" data-pos="hero" data-cta="hero">See what you can keep<svg aria-hidden="true"><use href="#arr"/></svg></a></div>
    </div></div>
  </section>
</main>`;
  tpl = tpl.replace(/<main\b[\s\S]*?<\/main>/, main404);
  const b = buildPage({ src: '_template.html', url: '/404.html', kind: 'page' }, tpl, { noindex: true });
  b.html = b.html.replace(`<link rel="canonical" href="${ORIGIN}/404.html">\n`, '');
  write('404.html', b.html);
}

/* Assets: referenced files + always-needed ones. CSS/JS may reference more (fonts via inline CSS). */
for (const a of ['assets/fonts/dm-sans-latin.woff2', 'assets/fonts/dm-sans-italic-latin.woff2', 'assets/fonts/dm-mono-500-latin.woff2',
  'img/icons/favicon-32.png', 'img/icons/apple-touch-icon.png', 'img/icons/icon-192.png', 'img/icons/icon-512.png', 'img/icons/heydrew-logo.png',
  'img/og-default.jpg', 'favicon.ico', 'img/o-drew-point.webp', 'img/o-drew-avatar.webp']) usedAssets.add(a);
for (const f of fs.readdirSync(path.join(SITE, 'downloads'))) usedAssets.add('downloads/' + f);
for (const a of usedAssets) copy(a);

/* sitemap.xml */
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${built.map(b => {
  const st = fs.statSync(path.join(SITE, b.pg.src)); const lm = (DATES[b.pg.src]?.modified) || st.mtime.toISOString().slice(0, 10);
  return `  <url><loc>${ORIGIN}${b.pg.url}</loc><lastmod>${lm}</lastmod><priority>${b.pg.pri}</priority></url>`;
}).join('\n')}\n</urlset>\n`;
write('sitemap.xml', sitemap);

/* robots.txt: everything allowed, AI crawlers named explicitly. */
write('robots.txt', `# HeyDrew robots.txt
User-agent: *
Allow: /

# AI search, assistants and model crawlers: allowed on purpose (citation + entity visibility)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: Bingbot
User-agent: Googlebot
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`);

/* site.webmanifest */
write('site.webmanifest', JSON.stringify({ name: 'HeyDrew', short_name: 'HeyDrew', description: 'Year-round tax strategy for business owners.', start_url: '/', display: 'browser', background_color: '#F7F8FB', theme_color: '#F7F8FB', icons: [{ src: '/img/icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/img/icons/icon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 2));

/* llms.txt + llms-full.txt */
const line = b => `- [${b.meta.title.replace(/ \| HeyDrew$/, '')}](${ORIGIN}${b.pg.url}): ${b.meta.desc}`;
const grp = pre => built.filter(b => pre(b.pg));
const llms = `# HeyDrew

> ${ENTITY_SENTENCE} Free assessment: TaxLand (https://taxland.heydrew.com/).

Educational content only; not tax, legal or financial advice. HeyDrew does not guarantee savings. Pricing is one annual fee, quoted on a strategy call; HeyDrew reaches out about 30 days before renewal with the client's options.

## Product
${grp(p => p.src.startsWith('product/')).map(line).join('\n')}

## Who it's for
${grp(p => p.src.startsWith('solutions/') && p.kind === 'service').map(line).join('\n')}

## Strategies
${grp(p => p.src === 'solutions/strategies.html').map(line).join('\n')}

## Guides and reference
${grp(p => p.src.startsWith('resources')).map(line).join('\n')}

## Company
${grp(p => ['company/about.html', 'company/security.html', 'company/contact.html'].includes(p.src)).map(line).join('\n')}

## Optional
${grp(p => ['case-studies.html', 'company/careers.html', 'company/affiliates.html'].includes(p.src)).map(line).join('\n')}
- [Full text of this site for LLMs](${ORIGIN}/llms-full.txt)
`;
write('llms.txt', llms);
const full = [`# HeyDrew: full site text\n\n> ${ENTITY_SENTENCE}\n\nGenerated from ${ORIGIN} for language models. Educational content only; not tax, legal or financial advice.\n`];
for (const b of built) {
  const src = fs.readFileSync(path.join(SITE, b.pg.src), 'utf8').replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const main = find(parse(src), n => n.tag === 'main');
  full.push(`\n---\n\nURL: ${ORIGIN}${b.pg.url}\nTitle: ${b.meta.title}\n\n${toMarkdown(main, b.pg.src)}\n`);
}
write('llms-full.txt', full.join('\n'));

/* Redirects: Netlify / Cloudflare Pages (_redirects) and Vercel (vercel.json). */
write('_redirects', `# 301 map from the old WordPress site (heydrew.com) to the new URLs.\n# Trailing slashes: pages are folders with index.html, so /product/pricing redirects to /product/pricing/ on Netlify and Cloudflare Pages by default.\n` +
  REDIRECTS.map(([f, t, c = 301]) => `${f.padEnd(72)} ${t.padEnd(52)} ${c}`).join('\n') + '\n');
write('vercel.json', JSON.stringify({ cleanUrls: false, trailingSlash: true, redirects: REDIRECTS.filter(([f]) => !(f.endsWith('/') && REDIRECTS.some(([g]) => g === f.slice(0, -1)))).map(([f, t, c = 301]) => ({ source: f.replace(/\/$/, ''), destination: t, permanent: c === 301 })) }, null, 2));

/* ---------------------------------------------------------------------------
   8. Lint.
   --------------------------------------------------------------------------- */
const errors = [];
const seenT = new Map(), seenD = new Map();
const exists = u => { const p = u.replace(/[?#].*$/, ''); if (/^\/(privacy-policy|terms-of-use|engagement-terms|sms-terms|cookie-policy)\/$/.test(p)) return 'legal'; const f = path.join(OUT, decodeURIComponent(p)); return fs.existsSync(f) && (fs.statSync(f).isFile() || fs.existsSync(path.join(f, 'index.html'))); };
const BANNED = [[/never auto-renew/i, '"never auto-renew"'], [/licensed CPAs?\b/i, '"licensed CPA"'], [/\b(two|three|four|five|six|seven|eight|nine|ten|twelve|\d{1,2})\s+(tax\s+|of\s+(our|the)\s+|key\s+|core\s+)?strategies\b/i, 'a number of strategies'], [/\bN of 8\b|\+\s*\d+\s*more\b/i, 'a strategy count']];
const legalLinks = new Set();
for (const b of built.concat([{ pg: { url: '/404.html', src: '404' }, html: fs.readFileSync(path.join(OUT, '404.html'), 'utf8'), noindex: true }])) {
  const { pg, html } = b, doc = parse(html);
  const t = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ''), d = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (!b.noindex) {
    if (!t) errors.push(`${pg.url}: no <title>`); if (t.length > 60) errors.push(`${pg.url}: title ${t.length} chars`);
    if (!d) errors.push(`${pg.url}: no description`); if (d.length > 155) errors.push(`${pg.url}: description ${d.length} chars`);
    if (seenT.has(t)) errors.push(`${pg.url}: duplicate title with ${seenT.get(t)}`); seenT.set(t, pg.url);
    if (seenD.has(d)) errors.push(`${pg.url}: duplicate description with ${seenD.get(d)}`); seenD.set(d, pg.url);
    if (!html.includes(`<link rel="canonical" href="${ORIGIN}${pg.url}">`)) errors.push(`${pg.url}: canonical missing`);
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch (e) { errors.push(`${pg.url}: JSON-LD does not parse (${e.message})`); } }
  }
  const h1s = findAll(doc, n => n.tag === 'h1').length; if (h1s !== 1) errors.push(`${pg.url}: ${h1s} H1s`);
  const imgs = findAll(doc, n => n.tag === 'img'); for (const im of imgs) { if (im.attrs.alt === undefined) errors.push(`${pg.url}: img without alt ${im.attrs.src}`); if (!im.attrs.width || !im.attrs.height) errors.push(`${pg.url}: img without width/height ${im.attrs.src}`); }
  for (const m of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) { const r = exists(m[1]); if (r === 'legal') legalLinks.add(m[1]); else if (!r) errors.push(`${pg.url}: broken internal link ${m[1]}`); }
  for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) for (const part of m[1].split(',')) { const u = part.trim().split(/\s+/)[0]; if (u.startsWith('/') && !exists(u)) errors.push(`${pg.url}: broken srcset ${u}`); }
  for (const m of html.matchAll(/<a\b[^>]*\shref="https:\/\/heydrew\.com(\/[^"?#]*)/g)) if (!LEGAL.some(l => m[1].startsWith('/' + l))) errors.push(`${pg.url}: link to old WordPress URL https://heydrew.com${m[1]}`); else legalLinks.add(m[1]);
  const visible = clean(text(find(doc, n => n.tag === 'body') || doc)) + ' ' + t + ' ' + d;
  for (const [re, label] of BANNED) { const m = visible.match(re); if (m) errors.push(`${pg.url}: contains ${label}: "${m[0]}"`); }
}
const smUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(ORIGIN, '')).sort();
const pgUrls = built.map(b => b.pg.url).sort();
if (JSON.stringify(smUrls) !== JSON.stringify(pgUrls)) errors.push('sitemap.xml does not match the built pages');

const count = (dir) => { let n = 0; for (const f of fs.readdirSync(dir, { withFileTypes: true })) n += f.isDirectory() ? count(path.join(dir, f.name)) : 1; return n; };
console.log(`Built ${built.length} pages + 404 into ${path.relative(process.cwd(), OUT) || OUT} (${count(OUT)} files).`);
console.log(`Origin ${ORIGIN}. Sitemap ${smUrls.length} URLs. Redirects ${REDIRECTS.length}.`);
if (legalLinks.size) console.log(`NOTE legal pages linked but not built yet (keep their live paths): ${[...new Set([...legalLinks].map(u => u.replace(/^https:\/\/heydrew\.com/, '')))].join(' ')}`);
for (const w of new Set(warnings)) console.warn('warn  ' + w);
if (errors.length) { for (const e of errors) console.error('ERROR ' + e); process.exit(1); }
console.log('Lint: OK (titles, descriptions, canonicals, one H1, alt/size on images, internal links, JSON-LD, sitemap, banned claims).');
