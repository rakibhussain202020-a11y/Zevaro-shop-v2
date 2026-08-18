create extension if not exists "pgcrypto";

create table if not exists admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  slug text unique not null,
  name text not null,
  description text default '',
  price numeric(12,2) not null,
  sale_price numeric(12,2),
  fabric text,
  fit text,
  pattern text,
  colors text[] default '{}',
  sizes text[] default '{}',
  stock integer default 0,
  badge text,
  featured boolean default false,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  storage_path text not null,
  sort_order integer default 0
);

create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  sku text not null,
  quantity integer not null default 0,
  low_stock_threshold integer not null default 5,
  updated_at timestamptz default now()
);

create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text,
  created_at timestamptz default now()
);

create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references carts(id) on delete cascade,
  product_id uuid references products(id),
  size text,
  color text,
  quantity integer not null default 1
);

create table if not exists wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  unique(user_id, product_id)
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text, mobile text, email text, house text, street text, landmark text,
  city text, state text, pincode text, created_at timestamptz default now()
);

create table if not exists orders (
  id text primary key,
  user_id uuid references auth.users(id),
  customer_name text not null,
  mobile text not null,
  email text,
  address jsonb not null,
  subtotal numeric(12,2) not null,
  shipping numeric(12,2) not null default 0,
  total numeric(12,2) not null,
  payment_method text not null default 'cod',
  payment_status text not null default 'pending',
  status text not null default 'Order Placed',
  courier text,
  tracking_number text,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id text references orders(id) on delete cascade,
  product_id uuid,
  product_name text not null,
  size text,
  color text,
  quantity integer not null,
  unit_price numeric(12,2) not null
);

create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  type text not null check(type in ('percentage','fixed')),
  value numeric(12,2) not null,
  min_order numeric(12,2) default 0,
  expiry timestamptz,
  usage_limit integer,
  usage_count integer default 0,
  active boolean default true
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  user_id uuid references auth.users(id),
  rating integer check(rating between 1 and 5),
  title text,
  body text,
  approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists settings (
  key text primary key,
  value jsonb not null
);

create table if not exists policies (
  key text primary key,
  title text not null,
  content text not null
);

insert into settings(key,value) values
('shipping', '{"charge":0,"label":"FREE SHIPPING ACROSS INDIA","estimate":"Configure delivery estimate in Admin"}'),
('contact', '{"phone":"8071303821","email":"zvaroshopcare@gmail.com","address":"Baji Rao Road, Pune, Maharashtra, 411001, India"}')
on conflict(key) do nothing;

alter table products enable row level security;
alter table product_images enable row level security;
alter table reviews enable row level security;
alter table settings enable row level security;
alter table policies enable row level security;

create policy "public active products" on products for select using (active = true);
create policy "public product images" on product_images for select using (true);
create policy "public approved reviews" on reviews for select using (approved = true);
create policy "public settings" on settings for select using (true);
create policy "public policies" on policies for select using (true);

-- IMPORTANT: orders are created through the server route using the service-role key.
-- Never expose SUPABASE_SERVICE_ROLE_KEY to browser/client code.


alter table admins enable row level security;
create policy "admins can read own row" on admins for select using (auth.uid() = id);

-- Atomic COD order creation: validates variants and stock server-side and decrements inventory in one transaction.
create or replace function place_cod_order(p_customer jsonb, p_items jsonb, p_coupon text default null, p_user_id uuid default null)
returns table(order_id text, total numeric) language plpgsql security definer set search_path = public as $$
declare
  v_order_id text := 'ZV-' || to_char(now(),'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8));
  v_subtotal numeric := 0;
  v_total numeric := 0;
  v_item jsonb;
  v_product products%rowtype;
  v_unit numeric;
  v_discount numeric := 0;
  v_coupon coupons%rowtype;
begin
  for v_item in select * from jsonb_array_elements(p_items) loop
    select * into v_product from products where id=(v_item->>'productId')::uuid and active=true for update;
    if not found then raise exception 'Product unavailable'; end if;
    if not (v_product.sizes @> array[v_item->>'size']) then raise exception 'Size unavailable for %', v_product.name; end if;
    if not (v_product.colors @> array[v_item->>'color']) then raise exception 'Color unavailable for %', v_product.name; end if;
    if v_product.stock < (v_item->>'quantity')::int then raise exception 'Insufficient stock for %', v_product.name; end if;
    v_unit := coalesce(v_product.sale_price,v_product.price);
    v_subtotal := v_subtotal + v_unit * (v_item->>'quantity')::int;
  end loop;
  v_total := v_subtotal;
  if p_coupon is not null and length(trim(p_coupon))>0 then
    select * into v_coupon from coupons where code=upper(trim(p_coupon)) and active=true for update;
    if found and (v_coupon.expiry is null or v_coupon.expiry>now()) and v_subtotal>=coalesce(v_coupon.min_order,0) and (v_coupon.usage_limit is null or v_coupon.usage_count<v_coupon.usage_limit) then
      if v_coupon.type='percentage' then v_discount:=least(v_subtotal,v_subtotal*v_coupon.value/100); else v_discount:=least(v_subtotal,v_coupon.value); end if;
      v_total:=v_subtotal-v_discount;
      update coupons set usage_count=usage_count+1 where id=v_coupon.id;
    end if;
  end if;
  insert into orders(id,user_id,customer_name,mobile,email,address,subtotal,shipping,total,payment_method,payment_status,status)
  values(v_order_id,p_user_id,p_customer->>'fullName',p_customer->>'mobile',p_customer->>'email',p_customer, v_subtotal,0,v_total,'cod','pending','Order Placed');
  for v_item in select * from jsonb_array_elements(p_items) loop
    select * into v_product from products where id=(v_item->>'productId')::uuid for update;
    v_unit:=coalesce(v_product.sale_price,v_product.price);
    insert into order_items(order_id,product_id,product_name,size,color,quantity,unit_price) values(v_order_id,v_product.id,v_product.name,v_item->>'size',v_item->>'color',(v_item->>'quantity')::int,v_unit);
    update products set stock=stock-(v_item->>'quantity')::int where id=v_product.id;
  end loop;
  return query select v_order_id,v_total;
end; $$;

create table if not exists newsletter_subscribers(id uuid primary key default gen_random_uuid(),email text unique not null,created_at timestamptz default now());
alter table newsletter_subscribers enable row level security;
create policy "newsletter insert public" on newsletter_subscribers for insert with check (true);

-- Protect customer data. Guest orders remain server-only; authenticated customers can read only their own records.
alter table orders enable row level security;
alter table order_items enable row level security;
alter table addresses enable row level security;
alter table wishlists enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table coupons enable row level security;
create policy "users read own orders" on orders for select using (auth.uid() = user_id);
create policy "users read own order items" on order_items for select using (exists(select 1 from orders o where o.id=order_id and o.user_id=auth.uid()));
create policy "users manage own addresses" on addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own wishlist" on wishlists for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own carts" on carts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own cart items" on cart_items for all using (exists(select 1 from carts c where c.id=cart_id and c.user_id=auth.uid())) with check (exists(select 1 from carts c where c.id=cart_id and c.user_id=auth.uid()));
revoke all on coupons from anon, authenticated;
revoke execute on function place_cod_order(jsonb,jsonb,text,uuid) from public, anon, authenticated;
grant execute on function place_cod_order(jsonb,jsonb,text,uuid) to service_role;

-- Product images are served through public Supabase Storage URLs; service-role handles uploads.
insert into storage.buckets (id,name,public) values ('product-images','product-images',true) on conflict (id) do update set public=true;

insert into policies(key,title,content) values
('shipping','Shipping Policy','FREE SHIPPING ACROSS INDIA. Final delivery estimate and operational details are configured by ZEVARO SHOP.'),
('returns','Return / Refund Policy','Add your finalized return and refund terms here before launch.'),
('cancellation','Cancellation Policy','Add your finalized cancellation terms here before launch.'),
('privacy','Privacy Policy','Add your finalized privacy notice here before launch.'),
('terms','Terms & Conditions','Add your finalized terms and conditions here before launch.'),
('faq','FAQ','Add your finalized frequently asked questions here.')
on conflict(key) do nothing;
