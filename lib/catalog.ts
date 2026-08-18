import { createSupabaseServerClient } from '@/lib/supabase/server';
import { sampleProducts } from '@/lib/products';
import { Product } from '@/lib/types';

export async function getCatalog(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return sampleProducts;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('products').select('id,slug,name,price,sale_price,fabric,fit,pattern,colors,sizes,stock,badge,description,sku,product_images(storage_path,sort_order)').eq('active', true).order('created_at', { ascending:false });
    if (!data?.length) return sampleProducts;
    return data.map((p:any) => { const images=(p.product_images||[]).sort((a:any,b:any)=>a.sort_order-b.sort_order).map((x:any)=>{ if(/^https?:\/\//.test(x.storage_path)) return x.storage_path; return supabase.storage.from('product-images').getPublicUrl(x.storage_path).data.publicUrl; }).filter(Boolean); return {...p, images:images.length?images:[`/products/${p.slug}.svg`]}; });
  } catch { return sampleProducts; }
}

export async function getCatalogProduct(slug:string) {
  const products=await getCatalog();
  return products.find(p=>p.slug===slug);
}
