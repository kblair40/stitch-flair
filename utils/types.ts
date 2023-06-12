export interface Product {
  [key: string]: string | number | boolean | null | undefined;
  id: number;
  price: string;
  image_url: string;
  name: string;
  category_id: number;
  description?: string;
  featured: boolean;
  on_sale: boolean;
  on_sale_price?: null | string;
  etsy_url?: string;
}

export interface Category {
  id: number;
  title: string;
  products?: Product[];
}
