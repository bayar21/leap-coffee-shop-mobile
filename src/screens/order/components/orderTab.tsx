import React, {useState} from 'react';
import {Order} from '../../../interfaces';
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {OrderDetailModal, OrderCard} from '.';

export const Orders = ({orders}: {orders: Order[] | undefined}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      {orders ? (
        <FlatList
          style={styles.list}
          data={orders}
          renderItem={({item}) => (
            <OrderCard setSelectedOrder={setSelectedOrder} order={item} />
          )}
          keyExtractor={(_item, index) => `${index}`}
        />
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
      {selectedOrder && (
        <Pressable
          onPress={() => {
            setSelectedOrder(null);
          }}
          style={styles.darkBg}
        />
      )}
      <OrderDetailModal
        order={selectedOrder}
        close={() => {
          setSelectedOrder(null);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pressableButton: {
    marginTop: '20%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 35,
    paddingVertical: 12,
    alignItems: 'center',
  },
  item: {
    width: '94%',
    padding: '4%',
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    margin: '3%',
  },
  itemContainer: {
    width: '94%',
    padding: '4%',
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    margin: '3%',
  },
  itemFont: {
    fontFamily: 'HelveticaNeue-Light',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
