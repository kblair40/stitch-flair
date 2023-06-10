export interface Product {
  id: number;
  price: string;
  image_url: string;
  name: string;
  category_id?: number;
  description?: string;
  featured: boolean;
  on_sale: boolean;
  on_sale_price?: null | string;
}

export interface Category {
  id: number;
  title: string;
  products?: Product[];
}
