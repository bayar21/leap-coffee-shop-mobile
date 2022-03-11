import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectShopScreen from '../../screens/select-shop';
import {NavigationRoutes} from '../navigation-params';
const Stack = createNativeStackNavigator();

const StoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={NavigationRoutes.SelectStoreMapScreen}
        component={SelectShopScreen}
      />
    </Stack.Navigator>
  );
};

export default StoreStack;
