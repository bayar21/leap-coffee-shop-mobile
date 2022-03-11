import React, {useState, useContext} from 'react';
import {postOrder} from '../api/order';
import {Order, OrderProduct} from '../interfaces';

interface CartContextInterface {
  items: OrderProduct[];
  setItems: React.Dispatch<React.SetStateAction<OrderProduct[]>>;
  removeItem: (id: number) => void;
  addItem: (item: OrderProduct) => void;
  empty: () => void;
  checkout: (order: Order, callback: (res: any) => void) => void;
  loading: boolean;
}

const CartContext = React.createContext<CartContextInterface | null>(null);

export const CartProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<OrderProduct[]>([]);

  const removeItem = (id: number) => {
    setItems(items.filter((_item, index: number) => index !== id));
  };

  const addItem = (item: OrderProduct) => {
    setItems(prev => [...prev, item]);
  };

  const empty = () => {
    setItems([]);
  };

  const checkout = (order: Order, callback: (res: any) => void) => {
    setLoading(true);
    postOrder(order)
      .then(res => {
        empty();
        setLoading(false);
        callback(res.data.qpay);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <CartContext.Provider
      value={{items, setItems, removeItem, empty, addItem, checkout, loading}}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
