import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Product} from '../../../interfaces';
import {NavigationRoutes} from '../../../navigations/navigation-params';

interface Props extends Product {
  width: number;
}

export const ProductCard = (props: Props) => {
  const navigation = useNavigation();
  const {thumbnail, name, basePrice, width} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(NavigationRoutes.ProductDetailScreen, {...props});
      }}
    >
      <FastImage
        style={[styles.thumbnail, {width: width, height: width * 1.125}]}
        source={{
          uri: thumbnail,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{basePrice}₮ / spruce</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    borderRadius: 4,
  },
  titleContainer: {
    marginTop: 12,
    height: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#2D2A2B',
  },
  priceContainer: {
    marginTop: 4,
    height: 20,
    justifyContent: 'center',
  },
  price: {
    fontSize: 13,
    color: '#2D2A2B',
    fontWeight: '300',
  },
});
