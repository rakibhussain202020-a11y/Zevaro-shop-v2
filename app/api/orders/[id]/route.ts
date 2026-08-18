import { createClient } from "@supabase/supabase-js";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const mobile = new URL(req.url).searchParams.get("mobile") || "";

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await db
    .from("orders")
    .select("*")
    .eq("id", id)
    .eq("mobile", mobile)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  const step = [
    "Order Placed",
    "Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ].indexOf(data.status);

  return NextResponse.json({
    order: { ...data, step: step < 0 ? 0 : step }
  });
}
