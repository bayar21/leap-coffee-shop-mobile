import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './customTabBar';

import OrderStack from '../../stacks/order-stack';
import StoreStack from '../../stacks/store-stack';

import UserScreen from '../../../screens/user';
import HomeScreen from '../../../screens/home';
import OrderScreen from '../../../screens/order';

const Tab = createBottomTabNavigator();
const MainBottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="OrderScreen" component={OrderScreen} />
      <Tab.Screen name="UserScreen" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomNavigation;
