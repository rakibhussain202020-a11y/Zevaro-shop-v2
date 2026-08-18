export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  sale_price?: number | null;
  rating?: number | null;
  review_count?: number | null;
  badge?: string | null;
  description: string;
  fabric: string;
  fit: string;
  pattern: string;
  colors: string[];
  sizes: string[];
  stock: number;
  sku: string;
  images: string[];
};

export type CartItem = {
  key: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

export type Address = {
  fullName: string;
  mobile: string;
  email: string;
  house: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
};
