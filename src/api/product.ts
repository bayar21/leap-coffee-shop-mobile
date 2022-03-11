import axios from 'axios';
import {
  getAllProductsUrl,
  getByProductsByCategoryUrl,
  getCategoriesUrl,
  getSpecialProductsUrl,
} from './urls';

export const getAllProducts = () => {
  const url = getAllProductsUrl();
  return axios.get(url);
};

export const getProductsByCategory = (categoryId: string) => {
  const url = getByProductsByCategoryUrl(categoryId);
  return axios.get(url);
};

export const getCategories = () => {
  const url = getCategoriesUrl();
  return axios.get(url);
};

export const getSpecialProducts = () => {
  const url = getSpecialProductsUrl();
  return axios.get(url);
};
