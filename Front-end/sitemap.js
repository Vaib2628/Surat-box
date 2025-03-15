import  { SitemapStream, streamToPromise } from "sitemap";
import  fs from "fs";

const BASE_URL = "https://bookyourbox.vercel.app"; // Replace with your domain
const pages = ["/", "/about", "/contact", "/venues", "/venues/:location?"]; // Add all pages here

const sitemap = new SitemapStream({ hostname: BASE_URL });

pages.forEach((page) => {
  sitemap.write({ url: page, changefreq: "daily", priority: 0.7 });
});

sitemap.end();

streamToPromise(sitemap)
  .then((data) => fs.writeFileSync("./public/sitemap.xml", data))
  .then(() => console.log("Sitemap generated successfully!"))
  .catch((err) => console.error(err));
