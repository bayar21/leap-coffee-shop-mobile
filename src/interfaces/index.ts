export interface Extras {
  name: string;
  calories: number;
  sugar: number;
  fat: number;
  price: number;
}
export interface Product {
  thumbnail: string;
  name: string;
  basePrice: number;
  duration: number;
  _id: string;
  sizes: Extras[] | [];
  milkTypes: Extras[] | [];
  foamTypes: Extras[] | [];
  creamTypes: Extras[] | [];
}
export interface User {
  _id: string;
  phone: string;
}

export interface Category {
  _id: string;
  name: string;
}
export interface OrderProduct {
  productId: string;
  thumbnail: string;
  name: string;
  shots: number;
  price: number;
  size: string;
  foam: string;
  milk: string;
  cream: string;
}

export interface Order {
  products: OrderProduct[];
  storeId: string;
  quantity: number;
  date?: number;
  totalPrice: number;
  status: string;
  userId?: string;
}
