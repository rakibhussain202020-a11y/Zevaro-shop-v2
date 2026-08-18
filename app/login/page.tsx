 "use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setError("");const s=createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);const r=await s.auth.signInWithPassword({email,password});if(r.error){setError(r.error.message);return}router.push("/account")}
 return <main className="container-z py-16 max-w-md"><h1 className="serif text-4xl">Login</h1><form onSubmit={submit} className="space-y-3 mt-8"><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border hairline px-4 py-3"/><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border hairline px-4 py-3"/>{error&&<p className="text-sm text-red-600">{error}</p>}<button className="w-full bg-black text-white py-4 text-xs tracking-[.15em]">LOGIN</button></form></main>
}
