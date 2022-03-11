import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationRoutes} from '../../navigations/navigation-params';

export const Location = ({selectedShop}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate(NavigationRoutes.MapScreen);
        }}
      >
        <View>
          <Text style={styles.title}>Pick-up store</Text>
          <Text style={styles.name}>
            {selectedShop.name} • {Math.floor(selectedShop.distance * 1000)}m{' '}
          </Text>
        </View>
        <Icon name="chevron-right" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#2D2A2B',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },
  logo: {
    width: 168,
    height: 25,
    position: 'relative',
  },
  title: {
    fontSize: 10,
    marginBottom: 3,
    color: 'white',
  },
  name: {
    fontSize: 14,
    color: 'white',
  },
});
