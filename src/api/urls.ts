const server_url = 'http://192.168.0.106:7000';

// Product Related

export const getAllProductsUrl = () => server_url + '/products';

export const getByProductsByCategoryUrl = (id: string) =>
  server_url + `/products?categoryId=${id}`;

export const getCategoriesUrl = () => server_url + '/categories';

export const getSpecialProductsUrl = () => server_url + '/specialProducts';

// Store

export const getAllStoresUrl = () => server_url + '/stores';

// Authentication

export const postPhoneUrl = () => server_url + '/auth/phone';

export const verifyOtpUrl = () => server_url + '/auth/verify';

// Config

export const getConfigUrl = () => server_url + '/config/';

// Order

export const getOrdersUrl = () => server_url + '/orders';
export const postOrderUrl = () => server_url + '/createorder';
