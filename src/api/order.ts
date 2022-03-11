import axios from 'axios';
import {Order} from '../interfaces';
import {getOrdersUrl, postOrderUrl} from './urls';

export const getAllOrders = () => {
  const url = getOrdersUrl();
  return axios.get(url);
};

export const getOrdersByStatus = (status: string) => {
  const url = getOrdersUrl();
  return axios.get(url + `?status=${status}`);
};

export const postOrder = (order: Order) => {
  const url = postOrderUrl();
  return axios.post(url, {order: order});
};
