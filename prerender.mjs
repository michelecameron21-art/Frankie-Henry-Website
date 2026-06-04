// Post-build prerender: turns each blog post into its own static HTML page
// with real meta tags + content baked in, so Google can index them.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import blogPosts from './src/data/blogPosts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist');
const SITE = 'https://www.frankiehenryadventures.com';
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

// --- Sub-pages (Google sitelink targets) ---
const SUB_PAGES = [
  {
    path: 'the-brave-river-rescue',
    title: "The Brave River Rescue | Frankie & Henry's First Adventure",
    description: 'Two Yorkshire Terrier brothers, a lost jackal cub, and a monitor lizard closing in. A safari picture book for kids aged 4 to 8.',
    image: `${SITE}/assets/book-mockup.png`,
    h1: 'The Brave River Rescue',
    body: `<p>Frankie and Henry's first picture book adventure. Two Yorkshire Terrier brothers discover a secret tunnel in their garden and burst out into the Wild Place, a magical African safari. There they find a stranded jackal cub and a monitor lizard closing in. The brothers must find the courage to rescue the cub before it is too late.</p><p>A picture book for children aged 4 to 8, inspired by two real Yorkshire Terriers who used to walk together every morning.</p><p><a href="https://www.amazon.com/dp/B0GTVVPPH6">Buy on Amazon</a></p>`,
  },
  {
    path: 'meet-frankie-and-henry',
    title: 'Meet Frankie & Henry | The Real Brothers Behind the Book',
    description: 'The real Yorkshire Terrier brothers whose walks together inspired the Wild Place. Their story, their photos and how the book came to be.',
    image: `${SITE}/assets/hero-bros.jpg`,
    h1: 'Meet Frankie and Henry',
    body: `<p>Frankie and Henry are two real Yorkshire Terrier brothers who inspired the picture book. Frankie was the fearless one. Henry was the thoughtful one. They walked together every morning, and their bond is at the heart of the story.</p><p>This is the real-life backstory of the book and the dogs who made it possible.</p>`,
  },
  {
    path: 'safari-heroes',
    title: 'Safari Heroes | The Cast of the Wild Place',
    description: 'Meet the lion king, the rhino guardian, the giraffe lookout and every safari hero the brothers encounter in the Wild Place.',
    image: `${SITE}/assets/hero-bros.jpg`,
    h1: 'Safari Heroes',
    body: `<p>Meet the cast of the Wild Place. The Lion King, the Rhino Guardian, the Giraffe Lookout, the Blue Crane, the Martial Eagle, the Black-Backed Jackal and the Monitor Lizard. Every safari hero the brothers encounter in the Brave River Rescue.</p>`,
  },
  {
    path: 'freebies',
    title: 'Free Safari Colouring Pages and Activity Sheets',
    description: 'Free downloadable safari colouring pages, activity sheets and bedtime printables for kids who love Frankie and Henry.',
    image: `${SITE}/assets/hero-bros.jpg`,
    h1: 'Free Safari Colouring Pages and Activities',
    body: `<p>Free downloadable activities for kids who love Frankie and Henry. Safari colouring pages, spot the difference, sing-along sheets and printables to enjoy alongside the book.</p>`,
  },
  {
    path: 'reviews',
    title: 'Reviews | Frankie & Henry: The Brave River Rescue',
    description: 'Reviews from parents, teachers and small readers of the Brave River Rescue. Honest takes on the picture book inspired by two real Yorkies.',
    image: `${SITE}/assets/book-mockup.png`,
    h1: 'Reviews',
    body: `<p>What parents, teachers and small readers are saying about Frankie and Henry: The Brave River Rescue. Five-star reviews from Amazon customers.</p>`,
  },
];

for (const p of SUB_PAGES) {
  const canonical = `${SITE}/${p.path}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: p.title,
    description: p.description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: 'Frankie & Henry Adventures', url: SITE },
    primaryImageOfPage: { '@type': 'ImageObject', url: p.image },
  };
  const bodyHtml = `<article><h1>${text(p.h1)}</h1>${p.body}</article>`;
  write(p.path, buildPage(template, {
    title: p.title,
    description: p.description,
    canonical,
    image: p.image,
    jsonLd,
    bodyHtml,
  }));
}

// --- Sitemap ---
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, lastmod: today, priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE}/blog`, lastmod: today, priority: '0.8', changefreq: 'weekly' },
  ...SUB_PAGES.map((p) => ({ loc: `${SITE}/${p.path}`, lastmod: today, priority: '0.8', changefreq: 'monthly' })),
  ...blogPosts.map((p) => ({ loc: `${SITE}/blog/${p.id}`, lastmod: p.date || today, priority: '0.7', changefreq: 'monthly' })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

console.log(`Prerendered ${blogPosts.length} blog posts + blog index + sitemap (${urls.length} URLs).`);
