import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/AntDesign';
import {useCart} from '../../../contexts';
import {OrderProduct} from '../../../interfaces';

interface Props extends OrderProduct {
  index: number;
}

export const Card = (props: Props) => {
  const cart = useCart();
  const {index, thumbnail, name, price, size, milk, cream, foam} = props;

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

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <TouchableOpacity
            onPress={() => {
              cart?.removeItem(index);
            }}
          >
            <Icon name="close" size={16} />
          </TouchableOpacity>
        </View>
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
