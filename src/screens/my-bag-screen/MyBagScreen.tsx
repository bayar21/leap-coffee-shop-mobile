import React, {isValidElement} from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from '../../components';
import {useCart} from '../../contexts';
import {NavigationRoutes} from '../../navigations/navigation-params';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../contexts';

export type itemType = {
  name: string;
  price: number;
  size: any;
  foam: any;
  milk: any;
  cream: any;
  thumbnail: string;
  shots: number;
};

// subTotal, total, tax fees

export const MyBagScreen = () => {
  const {cartItems, removeItem} = useCart();
  const navigation = useNavigation();
  const auth = useAuth();
  const taxFee = 0;
  const subTotal = cartItems.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price;
  }, 0);
  const auth = useAuth();

  const renderItem = ({item, index}: ListRenderItemInfo<itemType>) => {
    return (
      <View style={styles.cart} key={index}>
        <Image source={{uri: item.thumbnail}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.orderTitle}>
            {item.name} {item.size.name}
          </Text>
          <Text>
            + {item.cream.name}, {item.foam.name}, {item.milk.name} milk,{' '}
            {item.shots < 2 ? `${item.shots} shot` : `${item.shots} shots`}
          </Text>
          <Text>₮{item.price}</Text>
        </View>
        <Pressable onPress={() => removeItem(index)}>
          <Image source={require('./delete.png')} style={styles.mRight10} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={[styles.container, styles.pHorizantal10]}>
      <Text style={styles.orderTitle}>Order items ({cartItems.length})</Text>
      <View style={styles.flatStyle}>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={cartItems}
          renderItem={renderItem}
          // keyExtractor={index => index + ''}
        />
      </View>
      <View style={[styles.bottomSection, styles.pHorizantal10]}>
        <View style={styles.pHorizantal10}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.paddingBottom}>Subtotal</Text>
            <Text style={styles.paddingBottom}>₮ {subTotal}</Text>
          </View>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.paddingBottom}>Tax and Fees</Text>
            <Text style={styles.paddingBottom}>₮ {taxFee}</Text>
          </View>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={[styles.orderTitle, styles.mVertical0]}>Total</Text>
            <Text style={[styles.orderTitle, styles.mVertical0]}>
              ₮ {subTotal + taxFee}
            </Text>
          </View>
        </View>
        <View style={[styles.btn, styles.pHorizantal15]}>
          <Button
            text={`Check out ₮${subTotal + taxFee}`}
            type="primary"
            onPress={() => {
              if (!auth.user) {
                navigation.navigate(NavigationRoutes.SignUpScreen, {
                  prevScreen: 'bag-screen',
                });
              } else navigation.navigate(NavigationRoutes.PaymentStack);
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  mVertical0: {
    marginVertical: 0,
  },

  pHorizantal10: {
    paddingHorizontal: 10,
  },
  pHorizantal15: {
    paddingHorizontal: 15,
  },
  pHorizantal20: {
    paddingHorizontal: 20,
  },

  mRight10: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  flatStyle: {
    height: '60%',
    marginBottom: 18,
  },

  orderTitle: {
    fontWeight: '500',
    marginTop: 8,
    fontSize: 16,
    textTransform: 'capitalize',
  },

  cart: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
  },

  image: {
    borderRadius: 8,
    width: '100%',
    height: 100,
    flex: 1,
  },

  details: {
    flex: 2,
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: -5,
    justifyContent: 'space-around',
    fontSize: 13,
  },

  paddingBottom: {
    paddingBottom: 10,
  },

  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },

  btn: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
  },

  bottomSection: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
    height: '30%',
    justifyContent: 'space-between',
  },
});
