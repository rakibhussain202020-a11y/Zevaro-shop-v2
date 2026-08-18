import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPage(){
 const s=await createSupabaseServerClient(); const {data:{user}}=await s.auth.getUser(); if(!user)redirect("/login");
 const {data:admin}=await s.from("admins").select("id,email").eq("id",user.id).maybeSingle(); if(!admin)redirect("/account");
 const [{count:products},{count:orders}]=await Promise.all([s.from("products").select("*",{count:"exact",head:true}),s.from("orders").select("*",{count:"exact",head:true})]);
 const {data:recent}=await s.from("orders").select("id,customer_name,total,status,created_at").order("created_at",{ascending:false}).limit(10);
 return <main className="container-z py-10"><p className="text-xs tracking-[.2em] text-muted">ADMIN</p><h1 className="serif text-4xl mt-2">ZEVARO SHOP Dashboard</h1><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">{[["Products",products||0],["Orders",orders||0],["Revenue","—"],["Low Stock","—"]].map(x=><div key={x[0]} className="border hairline p-5"><p className="text-xs text-muted">{x[0]}</p><b className="text-2xl mt-2 block">{x[1]}</b></div>)}</div><section className="mt-10"><h2 className="font-semibold">Recent Orders</h2><div className="overflow-x-auto mt-4"><table className="w-full text-sm"><thead><tr className="border-b hairline text-left"><th className="py-3">Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>{(recent||[]).map(o=><tr key={o.id} className="border-b hairline"><td className="py-3">{o.id}</td><td>{o.customer_name}</td><td>₹{Number(o.total).toLocaleString("en-IN")}</td><td>{o.status}</td></tr>)}</tbody></table></div></section><div className="mt-10 border hairline p-6 text-sm text-muted">Use Supabase Studio for initial product, inventory, coupon and policy management. The schema is ready for a dedicated CRUD admin UI.</div></main>
}
