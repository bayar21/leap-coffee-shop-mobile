import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {Order} from '../../../interfaces';
import {Card} from '.';

const {height} = Dimensions.get('window');

interface Props {
  close: () => void;
  order: Order | null;
}

export const OrderDetailModal = (props: Props) => {
  const {close, order} = props;

  return (
    <Modal
      onRequestClose={() => {
        close();
      }}
      animationType="slide"
      transparent={true}
      visible={props.order ? true : false}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}

          <View style={styles.header}>
            <Text style={styles.orderNumber}>Order</Text>
            <TouchableOpacity
              onPress={() => {
                close();
              }}
              style={styles.closeButton}
            >
              <Text>X</Text>
            </TouchableOpacity>
          </View>

          {/* Products */}

          <FlatList
            style={styles.list}
            data={order?.products}
            renderItem={({item}) => <Card {...item} />}
            keyExtractor={(item, index) => item.name + index}
          />

          {/* Footer */}

          <View style={styles.footer}>
            {/* Total */}
            <View>
              <Text style={styles.totalPrice}>
                Total Amount: {order?.totalPrice}₮
              </Text>
              <Text style={styles.quantity}>Quantity: {order?.quantity}</Text>
            </View>

            {/* Barcode */}

            {/* <Barcode /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    height: height * 0.75,
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    textTransform: 'capitalize',
    color: '#2D2A2B',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  totalPrice: {
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    textTransform: 'capitalize',
    fontWeight: '500',
    color: '#2D2A2B',
  },
  quantity: {
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    textTransform: 'capitalize',
    fontWeight: '500',
    color: '#2D2A2B',
    marginTop: 4,
  },
});
