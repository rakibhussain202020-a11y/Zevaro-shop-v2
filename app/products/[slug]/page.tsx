import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCatalogProduct, getCatalog } from '@/lib/catalog';
import { ProductDetail } from '@/components/product-detail';

export async function generateStaticParams(){return (await getCatalog()).map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=await getCatalogProduct(slug);return p?{title:`${p.name} | ZEVARO SHOP`,description:p.description,alternates:{canonical:`/products/${p.slug}`},openGraph:{title:p.name,description:p.description,images:p.images[0]?[p.images[0]]:[]}}:{title:'Product | ZEVARO SHOP'};}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=await getCatalogProduct(slug);if(!product)notFound();const related=(await getCatalog()).filter(x=>x.slug!==product.slug&& (x.fabric===product.fabric||x.fit===product.fit)).slice(0,4);return <main className="container-z py-6 md:py-10"><div className="text-xs text-muted mb-5"><Link href="/shop">Shop</Link> / {product.name}</div><ProductDetail product={product}/><section className="mt-20"><h2 className="serif text-3xl">You may also like</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7">{related.map(p=><Link key={p.slug} href={`/products/${p.slug}`} className="group"><div className="aspect-[4/5] bg-[#f6f5f1] relative overflow-hidden"><Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-[1.02] transition"/></div><p className="text-sm mt-3">{p.name}</p><p className="text-sm mt-1">₹{(p.sale_price??p.price).toLocaleString('en-IN')}</p></Link>)}</div></section></main>}
