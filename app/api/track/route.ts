import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export async function POST(req:Request){
 const {orderId,mobile}=await req.json(); if(!orderId||!mobile)return NextResponse.json({error:'Order ID and mobile are required'},{status:400});
 if(!process.env.SUPABASE_SERVICE_ROLE_KEY)return NextResponse.json({error:'Tracking is not configured yet.'},{status:503});
 const s=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{autoRefreshToken:false,persistSession:false}});
 const {data,error}=await s.from('orders').select('id,customer_name,mobile,total,payment_method,status,created_at,address,order_items(product_name,size,color,quantity,unit_price),courier,tracking_number').eq('id',orderId).eq('mobile',mobile).maybeSingle();
 if(error) return NextResponse.json({error:error.message},{status:500}); if(!data)return NextResponse.json({error:'Order not found.'},{status:404}); return NextResponse.json({order:data});
}
