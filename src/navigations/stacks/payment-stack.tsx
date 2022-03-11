import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentMethodScreen from '../../screens/payment-method/index';

const Stack = createNativeStackNavigator();

const PaymentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Payment" component={PaymentMethodScreen} />
    </Stack.Navigator>
  );
};

export default PaymentStack;
