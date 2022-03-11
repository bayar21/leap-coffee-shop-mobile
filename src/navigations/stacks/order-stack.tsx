import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderScreen from '../../screens/order';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Orders" component={OrderScreen} />
    </Stack.Navigator>
  );
};

export default OrderStack;
