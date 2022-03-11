import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Loader} from '../../../components/loader';

interface Props {
  width: number;
}

export const LoadingCard = ({width}: Props) => {
  return (
    <View>
      <View style={{width: width, height: width * 1.125}}>
        <Loader />
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Loader />
        </View>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.price}>
          <Loader />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 12,
    height: 20,
    justifyContent: 'center',
  },
  title: {
    width: '80%',
    height: 12,
  },
  priceContainer: {
    marginTop: 4,
    height: 20,
    justifyContent: 'center',
  },
  price: {
    width: '52%',
    height: 10,
  },
});
