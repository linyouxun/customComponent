function urlStr(url, priority = '0.60', lastmod = '2017-11-06', changefreq = 'always') {
  return `<url><loc>${url}</loc><priority>${priority}</priority><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq></url>\r\n`;
}

function xmlStr(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${content}
</urlset>`;
}

function xmlStrStart() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;
}
function xmlStrContent(content) {
  return `${content}\n`;
}
function xmlStrEnd() {
  return `</urlset>`;
}
module.exports = {
  urlStr,
  xmlStr,
  xmlStrStart,
  xmlStrContent,
  xmlStrEnd
};
