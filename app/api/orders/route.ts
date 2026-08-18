import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkoutSchema } from '@/lib/validation';
import { sampleProducts } from '@/lib/products';
import { createSupabaseServerClient } from '@/lib/supabase/server';

function adminClient(){
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!process.env.NEXT_PUBLIC_SUPABASE_URL || !key) return null;
 return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,key,{auth:{autoRefreshToken:false,persistSession:false}});
}
function orderId(){return `ZV-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomUUID().slice(0,8).toUpperCase()}`}

export async function POST(req:Request){
 try{
  const parsed=checkoutSchema.safeParse(await req.json()); if(!parsed.success)return NextResponse.json({error:'Invalid checkout details',details:parsed.error.flatten()},{status:400});
  const body=parsed.data; const supabase=adminClient(); let userId:string|null=null; if(supabase){ try { const ss=await createSupabaseServerClient(); const {data:{user}}=await ss.auth.getUser(); userId=user?.id||null; } catch {} }
  let lines:any[]=[]; let subtotal=0;
  if(supabase){
    const result=await supabase.rpc('place_cod_order',{p_customer:body.customer,p_items:body.items,p_coupon:body.coupon||null,p_user_id:userId});
    if(result.error){console.error(result.error);return NextResponse.json({error:result.error.message||'Could not place order.'},{status:409});}
    const row=(result.data as any[])?.[0];
    if(!row)return NextResponse.json({error:'Order creation failed.'},{status:500});
    return NextResponse.json({orderId:row.order_id,total:Number(row.total)});
  }
  return NextResponse.json({error:'Order service is not configured. Add Supabase server credentials before accepting orders.'},{status:503});
 }catch(e){console.error(e);return NextResponse.json({error:'Unable to place order. Check server configuration.'},{status:500})}
}
