import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Button} from '../../components';
import {useAuth, useCart, useStore} from '../../contexts';
import {NavigationRoutes} from '../../navigations/navigation-params';
import {Card, Footer, Header} from './components';

export const MyBagScreen = ({navigation}) => {
  const cart = useCart();
  const store = useStore();

  const auth = useAuth();

  const getTotal = () => {
    let total = 0;
    cart?.items.forEach(item => {
      total += item.price;
    });
    return total;
  };

  return (
    <SafeAreaView style={styles.container}>
      {cart?.loading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FlatList
            style={styles.list}
            data={cart?.items}
            renderItem={({item, index}) => <Card index={index} {...item} />}
            keyExtractor={(item, index) => item.name + index}
            ListEmptyComponent={<View style={styles.empty} />}
            ListHeaderComponent={<Header number={cart?.items.length} />}
            ListFooterComponent={<Footer total={getTotal()} />}
          />
          {/* Button */}

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                if (!auth.user) {
                  navigation.navigate(NavigationRoutes.SignUpScreen, {
                    prevScreen: 'bag-screen',
                  });
                } else {
                  cart?.checkout(
                    {
                      storeId: '617776f9a630e8ba3f4fd632',
                      totalPrice: getTotal(),
                      status: 'processing',
                      quantity: cart.items.length,
                      products: cart.items,
                    },
                    res => {
                      navigation.navigate(NavigationRoutes.PaymentStack, res);
                    },
                  );
                }
              }}
              text={`Check out ${getTotal()}₮`}
              type="primary"
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: {
    fontSize: 16,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingTop: 16,
    flexDirection: 'row',
  },
});
