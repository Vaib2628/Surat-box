import fs from 'fs'
import { SitemapStream, streamToPromise } from "sitemap";

// Define your website's base URL
const BASE_URL = "https://bookyou.vercel.app";

// Define all pages you want Google to index
const pages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "weekly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },
    { url: "/booking", changefreq: "daily", priority: 0.9 },
];

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: BASE_URL });

    pages.forEach((page) => {
        sitemap.write(page);
    });

    sitemap.end();

    // Convert stream to XML format
    const sitemapXML = await streamToPromise(sitemap).then((data) => data.toString());

    // Save the sitemap.xml file in the Front-end/public/ folder
    fs.writeFileSync("./Front-end/public/sitemap.xml", sitemapXML);

    console.log("✅ Sitemap generated successfully!");
}

// Run the function
generateSitemap();
