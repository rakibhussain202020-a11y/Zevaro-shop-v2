import { MetadataRoute } from "next";
import { sampleProducts } from "@/lib/products";
export default function sitemap(): MetadataRoute.Sitemap {
 const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
 return [{url:base,priority:1},{url:`${base}/shop`,priority:.9},...sampleProducts.map(p=>({url:`${base}/products/${p.slug}`,priority:.7}))];
}
