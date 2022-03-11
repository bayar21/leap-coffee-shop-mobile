import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useStore} from '../../contexts';
import {NavigationRoutes} from '../../navigations/navigation-params';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components';
const TestScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, padding: 5}}>
       <Button type="primary" text="CheckOut" />
       <Button type="secondary" text="CheckOut" />
    </SafeAreaView>
  );
};

export default TestScreen;
