export interface Product {
  // [key: string]: string | number | boolean | null | undefined;
  id: number;
  price: string;
  image_url: string;
  name: string;
  category_id: number;
  promo_ids?: any[];
  promos?: Promotion[];
  // promo_ids?: number[];
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

export type PromoColor =
  | "green"
  | "red"
  | "blue"
  | "orange"
  | "purple"
  | "peach";

export interface Promotion {
  id?: number;
  text: string;
  active: boolean;
  color: PromoColor;
  created_time?: string | Date;
  updated_time?: string | Date;
}

export interface TextContent {
  homeText: string;
  homeTitle: string;
}
