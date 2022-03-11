import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationRoutes} from './navigation-params';
import MainBottomNavigation from './tabs/mainBottomTab/main-bottom-navigation';
import {ProductDetail} from '../screens/product-detail';
import StoreDirection from '../screens/home/storeDirection/storeDirection';
import {MyBagScreen} from '../screens/my-bag-screen';
import PaymentStack from './stacks/payment-stack';
import SignUpScreen from '../screens/sign-up-screen';
import ConfirmCodeScreen from '../screens/confirmcode-screen';
import MapScreen from '../screens/map';

const RootStack = createNativeStackNavigator();

const RootNavigationContainer: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={NavigationRoutes.MapScreen}
        screenOptions={{headerShown: false}}
      >
        {/* Authentication */}
        <RootStack.Group>
          <RootStack.Screen
            name={NavigationRoutes.SignUpScreen}
            component={SignUpScreen}
          />
          <RootStack.Screen
            name={NavigationRoutes.ConfirmCodeScreen}
            component={ConfirmCodeScreen}
          />
        </RootStack.Group>
        {/* Bag */}
        <RootStack.Screen
          name={NavigationRoutes.MyBagScreen}
          component={MyBagScreen}
          options={{
            headerShown: true,
            title: 'My Bag',
          }}
        />
        {/* Store Map */}
        <RootStack.Screen
          name={NavigationRoutes.MapScreen}
          component={MapScreen}
        />

        <RootStack.Screen
          name={NavigationRoutes.ProductDetailScreen}
          component={ProductDetail}
        />
        {/* Payment Method */}
        <RootStack.Screen
          name={NavigationRoutes.PaymentStack}
          component={PaymentStack}
        />
        {/* Main */}
        <RootStack.Screen
          name={NavigationRoutes.MainBottomTabBar}
          component={MainBottomNavigation}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
