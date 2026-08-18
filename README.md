# ZEVARO SHOP — Premium Collection

Production-oriented Next.js + TypeScript + Tailwind + Supabase/PostgreSQL e-commerce project for men's shirts.

## What is included

- Premium mobile-first ZEVARO SHOP storefront
- Homepage, collection/search/filter/sort, product detail and related products
- Product image gallery, size/color selection, quantity, pincode check UI
- Persistent local cart
- Guest checkout and optional Supabase Auth account checkout
- COD-only live order creation through a server-side Supabase RPC
- Server-side price/variant/stock validation and atomic stock decrement
- Coupon validation + percentage/fixed discounts + minimum order + expiry + usage limits
- Order confirmation and private order tracking by Order ID + mobile
- Account dashboard and customer order history for authenticated users
- Guest wishlist stored in browser; database-ready wishlist schema
- Protected admin dashboard
- Admin product creation, stock editing through product API, deactivation and product image upload
- Admin order status management
- Admin shipping/contact settings management
- Editable policy table
- Supabase Storage product-image setup
- SEO metadata, sitemap and robots
- Architecture ready for Razorpay/UPI/cards later
- No payment secret is shipped to the browser
- No fake reviews and no fake live orders when Supabase is not configured

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Zod
- Lucide React

## Install

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never expose it as a `NEXT_PUBLIC_*` variable.

## Supabase setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Create an Auth user for the store admin.
6. Insert that Auth user's UUID and email into `admins`.

Example:

```sql
insert into admins(id,email) values ('AUTH_USER_UUID','admin@example.com');
```

The SQL creates the `product-images` public Storage bucket and the required RLS policies.

## Admin

After logging in with an account that exists in `admins`:

- `/admin` — dashboard
- `/admin/products` — products, stock and image upload
- `/admin/orders` — order status management
- `/admin/settings` — shipping/contact settings

Policies are stored in the `policies` table and can be edited in Supabase Studio. Replace all placeholder legal text with the business's final policies before launch.

## Products

The seed contains 20 sample men's shirts. Their SVGs are only neutral demo assets.

Production product flow:

1. Add/edit the product in Admin.
2. Upload real licensed ZEVARO product photography through the Image control.
3. Add multiple images.
4. Set price, sale price, sizes, colors, fabric, fit, pattern and stock.

## Contact / shipping

Default settings:

- Phone: `8071303821`
- Email: `zvaroshopcare@gmail.com`
- Address: `Baji Rao Road, Pune, Maharashtra, 411001, India`
- Shipping: `FREE SHIPPING ACROSS INDIA`

The shipping/contact settings are editable from `/admin/settings`.

## COD flow

```text
Advertisement
  -> ZEVARO SHOP
  -> Collection
  -> Product
  -> Size/Color
  -> Add to Cart / Buy Now
  -> Guest or Login
  -> Address
  -> Cash on Delivery
  -> PLACE ORDER
  -> Atomic server-side order creation
  -> Order ID
  -> Track Order
```

If Supabase server credentials are missing, the order endpoint refuses to create an order. This is intentional: the project does not generate fake live orders.

## Online payments later

Recommended Razorpay architecture:

```text
Browser
  -> server /api/payments/create-order
  -> Razorpay order
  -> Razorpay Checkout
  -> server webhook
  -> verify signature
  -> mark payment paid
  -> fulfill order
```

Never put the Razorpay secret in browser code.

## Analytics

Add GA4, Meta Pixel and Google Ads IDs in `.env.local`, then wire the event helper for:

- `page_view`
- `view_item`
- `search`
- `add_to_cart`
- `begin_checkout`
- `purchase`
- `add_to_wishlist`

Do not invent tracking IDs.

## SEO

- SEO-friendly product URLs: `/products/<slug>`
- Product metadata
- Canonical URL support
- Open Graph metadata
- `sitemap.xml`
- `robots.txt`

Before launch, add JSON-LD Product schema with the final product price/availability and real product image URLs.

## Deployment

For Vercel:

```bash
npm install
npm run build
```

Add the same environment variables in Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production domain and configure the Supabase Auth redirect URLs for that domain.

## Replace brand assets

- Wordmark: `components/site-header.tsx` and `components/site-footer.tsx`
- Product demo images: `public/products/`
- Product database images: Supabase Storage `product-images`
- Contact/shipping: `/admin/settings`
- Policies: Supabase `policies` table
- Product data: `/admin/products`

## Production checklist

- Replace all demo imagery with licensed ZEVARO photography.
- Enter final legal policies.
- Verify the Pune business address/contact details.
- Configure Supabase Auth email settings.
- Create and verify the admin account.
- Test COD order creation and stock decrement.
- Test coupons and cancellation/return workflows.
- Add transactional email/SMS/WhatsApp provider.
- Add courier/shipping integration if required.
- Add rate limiting/WAF/bot protection.
- Configure analytics and ad conversion tracking.
- Run Lighthouse/Core Web Vitals tests on real Android devices.
- Configure database backups and monitoring.
