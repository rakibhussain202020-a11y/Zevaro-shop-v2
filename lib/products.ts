import { Product } from "./types";

const img = (id: string) => `/products/${id}.svg`;

export const sampleProducts: Product[] = [
  ["classic-white-shirt","Classic White Oxford Shirt",1899,1499,"White","Cotton Oxford","Regular","Solid","NEW","ZV-WHT-001"],
  ["midnight-black-shirt","Midnight Black Signature Shirt",2199,1699,"Black","Premium Cotton","Slim","Solid","BEST SELLER","ZV-BLK-002"],
  ["navy-linen-shirt","Navy Linen Resort Shirt",2299,1799,"Navy","Cotton Linen","Relaxed","Solid","NEW","ZV-NAV-003"],
  ["sky-blue-shirt","Sky Blue Everyday Shirt",1799,1399,"Sky Blue","Cotton","Regular","Solid",null,"ZV-SKY-004"],
  ["olive-overshirt","Olive Premium Overshirt",2499,1999,"Olive","Twill Cotton","Relaxed","Solid","TRENDING","ZV-OLV-005"],
  ["sand-beige-shirt","Sand Beige Linen Shirt",2299,1799,"Beige","Linen Blend","Regular","Solid",null,"ZV-BGE-006"],
  ["charcoal-shirt","Charcoal Executive Shirt",2199,1699,"Charcoal","Premium Cotton","Slim","Solid","BEST SELLER","ZV-CHR-007"],
  ["burgundy-shirt","Burgundy Evening Shirt",2399,1899,"Burgundy","Cotton Satin","Slim","Solid",null,"ZV-BRG-008"],
  ["sage-shirt","Sage Green Comfort Shirt",1999,1599,"Sage","Cotton","Regular","Solid","NEW","ZV-SGE-009"],
  ["denim-shirt","Indigo Denim Shirt",2499,1999,"Indigo","Denim","Regular","Solid",null,"ZV-DNM-010"],
  ["micro-check-shirt","Micro Check Formal Shirt",2099,1649,"White/Blue","Cotton","Slim","Check","NEW","ZV-CHK-011"],
  ["stripe-shirt","Blue Stripe Signature Shirt",2099,1649,"Blue/White","Cotton","Regular","Stripe",null,"ZV-STP-012"],
  ["rust-shirt","Rust Textured Shirt",2199,1749,"Rust","Cotton Slub","Relaxed","Textured","TRENDING","ZV-RST-013"],
  ["cream-shirt","Cream Minimal Shirt",1999,1549,"Cream","Cotton Linen","Regular","Solid",null,"ZV-CRM-014"],
  ["steel-blue-shirt","Steel Blue Performance Shirt",2299,1799,"Steel Blue","Performance Cotton","Slim","Solid","BEST SELLER","ZV-STL-015"],
  ["forest-shirt","Forest Green Linen Shirt",2399,1899,"Forest","Linen Blend","Relaxed","Solid","NEW","ZV-FOR-016"],
  ["plum-shirt","Deep Plum Premium Shirt",2299,1799,"Plum","Cotton Satin","Slim","Solid",null,"ZV-PLM-017"],
  ["stone-shirt","Stone Beige Utility Shirt",2499,1999,"Stone","Twill Cotton","Relaxed","Solid",null,"ZV-STN-018"],
  ["graphite-shirt","Graphite Smart Casual Shirt",2199,1699,"Graphite","Premium Cotton","Regular","Solid","TRENDING","ZV-GRF-019"],
  ["white-linen-shirt","White Linen Summer Shirt",2399,1899,"White","100% Linen","Relaxed","Solid","NEW","ZV-LIN-020"],
].map(([slug,name,price,sale,color,fabric,fit,pattern,badge,sku]) => ({
  id: sku as string, slug: slug as string, name: name as string,
  price: price as number, sale_price: sale as number,
  rating: null, review_count: 0, badge: badge as string | null,
  description: "A clean ZEVARO SHOP shirt designed around premium everyday dressing, refined proportions and versatile styling.",
  fabric: fabric as string, fit: fit as string, pattern: pattern as string,
  colors: [color as string], sizes: ["S","M","L","XL","XXL"], stock: 25,
  sku: sku as string, images: [img(slug as string), img(slug as string)]
}));

export function getProduct(slug: string) {
  return sampleProducts.find(p => p.slug === slug);
}
