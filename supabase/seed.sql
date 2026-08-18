-- Run after schema.sql. This inserts 20 test products with placeholder image paths.
-- Replace these rows/images before production launch.

insert into products(sku,slug,name,price,sale_price,fabric,fit,pattern,colors,sizes,stock,badge,featured)
values
('ZV-WHT-001','classic-white-shirt','Classic White Oxford Shirt',1899,1499,'Cotton Oxford','Regular','Solid','{"White"}','{"S","M","L","XL","XXL"}',25,'NEW',true),
('ZV-BLK-002','midnight-black-shirt','Midnight Black Signature Shirt',2199,1699,'Premium Cotton','Slim','Solid','{"Black"}','{"S","M","L","XL","XXL"}',25,'BEST SELLER',true),
('ZV-NAV-003','navy-linen-shirt','Navy Linen Resort Shirt',2299,1799,'Cotton Linen','Relaxed','Solid','{"Navy"}','{"S","M","L","XL","XXL"}',25,'NEW',true),
('ZV-SKY-004','sky-blue-shirt','Sky Blue Everyday Shirt',1799,1399,'Cotton','Regular','Solid','{"Sky Blue"}','{"S","M","L","XL","XXL"}',25,null,false),
('ZV-OLV-005','olive-overshirt','Olive Premium Overshirt',2499,1999,'Twill Cotton','Relaxed','Solid','{"Olive"}','{"S","M","L","XL","XXL"}',25,'TRENDING',true),
('ZV-BGE-006','sand-beige-shirt','Sand Beige Linen Shirt',2299,1799,'Linen Blend','Regular','Solid','{"Beige"}','{"S","M","L","XL","XXL"}',25,null,false),
('ZV-CHR-007','charcoal-shirt','Charcoal Executive Shirt',2199,1699,'Premium Cotton','Slim','Solid','{"Charcoal"}','{"S","M","L","XL","XXL"}',25,'BEST SELLER',true),
('ZV-BRG-008','burgundy-shirt','Burgundy Evening Shirt',2399,1899,'Cotton Satin','Slim','Solid','{"Burgundy"}','{"S","M","L","XL","XXL"}',25,null,false),
('ZV-SGE-009','sage-shirt','Sage Green Comfort Shirt',1999,1599,'Cotton','Regular','Solid','{"Sage"}','{"S","M","L","XL","XXL"}',25,'NEW',false),
('ZV-DNM-010','denim-shirt','Indigo Denim Shirt',2499,1999,'Denim','Regular','Solid','{"Indigo"}','{"S","M","L","XL","XXL"}',25,null,false),
('ZV-CHK-011','micro-check-shirt','Micro Check Formal Shirt',2099,1649,'Cotton','Slim','Check','{"White/Blue"}','{"S","M","L","XL","XXL"}',25,'NEW',false),
('ZV-STP-012','stripe-shirt','Blue Stripe Signature Shirt',2099,1649,'Cotton','Regular','Stripe','{"Blue/White"}','{"S","M","L","XL","XXL"}',25,null,false),
('ZV-RST-013','rust-shirt','Rust Textured Shirt',2199,1749,'Cotton Slub','Relaxed','Textured','{"Rust"}','{"S","M","L","XL","XXL"}',25,'TRENDING',false),
('ZV-CRM-014','cream-shirt','Cream Minimal Shirt',1999,1549,'Cotton Linen','Regular','Solid','{"Cream"}','{"S","M","L","XL","XXL"}',25,null,false),
('ZV-STL-015','steel-blue-shirt','Steel Blue Performance Shirt',2299,1799,'Performance Cotton','Slim','Solid','{"Steel Blue"}','{"S","M","L","XL","XXL"}',25,'BEST SELLER',false),
('ZV-FOR-016','forest-shirt','Forest Green Linen Shirt',2399,1899,'Linen Blend','Relaxed','Solid','{"Forest"}','{"S","M","L","XL","XXL"}',25,'NEW',false),
('ZV-PLM-017','plum-shirt','Deep Plum Premium Shirt',2299,1799,'Cotton Satin','Slim','Solid','{"Plum"}','{"S","M","L","XL","XXL"}',25,null,false),
('ZV-STN-018','stone-shirt','Stone Beige Utility Shirt',2499,1999,'Twill Cotton','Relaxed','Solid','{"Stone"}','{"S","M","L","XL","XXL"}',25,null,false),
('ZV-GRF-019','graphite-shirt','Graphite Smart Casual Shirt',2199,1699,'Premium Cotton','Regular','Solid','{"Graphite"}','{"S","M","L","XL","XXL"}',25,'TRENDING',false),
('ZV-LIN-020','white-linen-shirt','White Linen Summer Shirt',2399,1899,'100% Linen','Relaxed','Solid','{"White"}','{"S","M","L","XL","XXL"}',25,'NEW',false)
on conflict(sku) do nothing;
