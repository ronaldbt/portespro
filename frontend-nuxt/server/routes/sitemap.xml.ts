export default defineEventHandler((event) => {
  const siteUrl = 'https://portespro.es'
  
  const routes = [
    { url: `${siteUrl}/`, changefreq: 'daily', priority: '1.0' },
    { url: `${siteUrl}/guardamuebles`, changefreq: 'weekly', priority: '0.9' },
    { url: `${siteUrl}/embalajes`, changefreq: 'weekly', priority: '0.9' },
    { url: `${siteUrl}/transporte-frio`, changefreq: 'weekly', priority: '0.9' },
    { url: `${siteUrl}/ultima-milla`, changefreq: 'weekly', priority: '0.9' },
    { url: `${siteUrl}/mudanzas/particulares`, changefreq: 'weekly', priority: '0.8' },
    { url: `${siteUrl}/mudanzas/empresas`, changefreq: 'weekly', priority: '0.8' },
    { url: `${siteUrl}/mudanzas/oficinas`, changefreq: 'weekly', priority: '0.8' },
    { url: `${siteUrl}/mudanzas/internacionales`, changefreq: 'weekly', priority: '0.8' },
    { url: `${siteUrl}/mudanzas/urgentes`, changefreq: 'weekly', priority: '0.8' }
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `  <url>
    <loc>${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})

