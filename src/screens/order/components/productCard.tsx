import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {OrderProduct} from '../../../interfaces';

export const Card = (props: OrderProduct) => {
  const {thumbnail, name, price, size, milk, cream, foam} = props;

  return (
    <View style={styles.container}>
      {/* Thumbnail */}

      <FastImage
        style={styles.thumbnail}
        source={{
          uri: thumbnail,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Details */}

      <View style={styles.innerContainer}>
        {/* Title */}

        <Text style={styles.title}>{name}</Text>

        <Text style={styles.price}>
          {price}₮ / {size}
        </Text>
        <Text style={styles.extra}>+ {milk}</Text>
        <Text style={styles.extra}>+ {cream}</Text>
        <Text style={styles.extra}>+ {foam}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  innerContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    textTransform: 'capitalize',
    fontWeight: '500',
    color: '#2D2A2B',
  },
  price: {
    fontSize: 13,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    marginTop: 4,
    marginBottom: 8,
    textTransform: 'capitalize',
    color: '#2D2A2B',
  },
  extra: {
    fontSize: 13,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textTransform: 'capitalize',
    lineHeight: 20,
    color: '#2D2A2B',
  },
});
