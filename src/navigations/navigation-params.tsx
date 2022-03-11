import {Product} from '../interfaces';

export enum NavigationRoutes {
  SplashScreen = 'SplashScreen',
  HomeScreen = 'HomeScreen',
  MapScreen = 'MapScreen',
  SelectStoreMapScreen = 'SelectStoreMapScreen',
  MyOrderScreen = 'MyOrderScreen',
  MyBagScreen = 'MyBagScreen',
  PaymentScreen = 'PaymentScreen',
  PaymentSuccessScreen = 'PaymentSuccessScreen',
  ProductDetailScreen = 'ProductDetailScreen',
  StoreStack = 'StoreStack',
  HomeStack = 'HomeStack',
  OrderStack = 'OrderStack',
  ProfileStack = 'ProfileStack',
  MainBottomTabBar = 'MainBottomTabBar',
  ConfirmCodeScreen = 'ConfirmCodeScreen',
  SignUpScreen = 'SignUpScreen',
  AuthStack = 'AuthStack',
  PaymentStack = 'PaymentStack',
}

export type Empty = null;

export interface NavigationPayload<T> {
  props: T;
}

export type NavigationParamList = {
  [NavigationRoutes.ProductDetailScreen]: Product;
  // [NavigationRoutes.SplashScreen]: NavigationPayload<Empty>;
  // [NavigationRoutes.HomeScreen]: NavigationPayload<Empty>;
  // [NavigationRoutes.SelectStoreMapScreen]: NavigationPayload<Empty>;
  // [NavigationRoutes.MyOrderScreen]: NavigationPayload<Empty>;
  // [NavigationRoutes.MyBagScreen]: NavigationPayload<Empty>;
  // [NavigationRoutes.PaymentScreen]: NavigationPayload<Empty>;
  // [NavigationRoutes.PaymentSuccessScreen]: NavigationPayload<Empty>;
  // [NavigationRoutes.ProductDetailScreen]: NavigationPayload<Empty>;
  // [NavigationRoutes.StoreStack]: NavigationPayload<Empty>;
  // [NavigationRoutes.HomeStack]: NavigationPayload<Empty>;
  // [NavigationRoutes.OrderStack]: NavigationPayload<Empty>;
  // [NavigationRoutes.ProfileStack]: NavigationPayload<Empty>;
  // [NavigationRoutes.MainBottomTabBar]: NavigationPayload<Empty>
};
