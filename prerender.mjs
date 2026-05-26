// Post-build prerender: turns each blog post into its own static HTML page
// with real meta tags + content baked in, so Google can index them.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import blogPosts from './src/data/blogPosts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist');
const SITE = 'https://frankiehenryadventures.com';
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const attr = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildPage(template, { title, description, canonical, image, type = 'website', jsonLd, bodyHtml }) {
  let html = template;
  // Remove the home-page structured data (Book / FAQ / reviews etc.) so it isn't wrongly attached to blog pages
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
  // Title + description
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(title)}</title>`);
  html = html.replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${attr(description)}" />`);
  // Canonical + Open Graph + Twitter
  html = html.replace(/<link\s+rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta\s+property="og:url"[^>]*\/>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta\s+property="og:type"[^>]*\/>/, `<meta property="og:type" content="${type}" />`);
  html = html.replace(/<meta\s+property="og:title"[^>]*\/>/, `<meta property="og:title" content="${attr(title)}" />`);
  html = html.replace(/<meta\s+property="og:description"[^>]*\/>/, `<meta property="og:description" content="${attr(description)}" />`);
  html = html.replace(/<meta\s+name="twitter:title"[^>]*\/>/, `<meta name="twitter:title" content="${attr(title)}" />`);
  html = html.replace(/<meta\s+name="twitter:description"[^>]*\/>/, `<meta name="twitter:description" content="${attr(description)}" />`);
  if (image) {
    html = html.replace(/<meta\s+property="og:image"[^>]*\/>/, `<meta property="og:image" content="${image}" />`);
    html = html.replace(/<meta\s+name="twitter:image"[^>]*\/>/, `<meta name="twitter:image" content="${image}" />`);
  }
  // Add page-specific structured data
  if (jsonLd) {
    html = html.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>\n</head>`);
  }
  // Bake content into #root so crawlers read it immediately (React replaces it on mount)
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${bodyHtml}</div>`);
  return html;
}

function write(relPath, html) {
  const file = path.join(dist, relPath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// --- Individual blog posts ---
for (const p of blogPosts) {
  const canonical = `${SITE}/blog/${p.id}`;
  const image = p.image ? (p.image.startsWith('http') ? p.image : SITE + p.image) : null;
  const description = p.metaDescription || p.excerpt || '';
  const bodyHtml = `<article><h1>${text(p.title)}</h1>${p.excerpt ? `<p>${text(p.excerpt)}</p>` : ''}${image ? `<img src="${attr(p.image)}" alt="${attr(p.imageAlt || p.title)}" />` : ''}${p.content || ''}</article>`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description,
    datePublished: p.date,
    author: { '@type': 'Person', name: p.author || 'Michele Cameron' },
    publisher: { '@type': 'Organization', name: 'Liabri Studios' },
    mainEntityOfPage: canonical,
    url: canonical,
    ...(image ? { image: [image] } : {}),
  };
  write(`blog/${p.id}`, buildPage(template, { title: `${p.title} | Frankie & Henry`, description, canonical, image, type: 'article', jsonLd, bodyHtml }));
}

// --- Blog index page ---
const items = blogPosts
  .map((p) => `<li><a href="/blog/${p.id}">${text(p.title)}</a>${p.excerpt ? ` — ${text(p.excerpt)}` : ''}</li>`)
  .join('');
write('blog', buildPage(template, {
  title: 'Blog | Frankie & Henry',
  description: 'Stories, safari facts and reading tips from the world of Frankie and Henry, the brave Yorkshire Terriers.',
  canonical: `${SITE}/blog`,
  bodyHtml: `<h1>The Frankie &amp; Henry Blog</h1><ul>${items}</ul>`,
}));

// --- Sitemap ---
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, lastmod: today, priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE}/blog`, lastmod: today, priority: '0.8', changefreq: 'weekly' },
  ...blogPosts.map((p) => ({ loc: `${SITE}/blog/${p.id}`, lastmod: p.date || today, priority: '0.7', changefreq: 'monthly' })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

console.log(`Prerendered ${blogPosts.length} blog posts + blog index + sitemap (${urls.length} URLs).`);
