import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Status} from '.';
import {Order} from '../../../interfaces';

export interface Props {
  setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  order: Order;
}

export const OrderCard = (props: Props) => {
  const {quantity, date, totalPrice, status} = props.order;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Order Number quantity */}

        <View>
          <Text style={styles.orderNumber}>Order #</Text>
          <Text style={styles.quantityTitle}>
            Quantity: <Text style={styles.quantity}>{quantity}</Text>
          </Text>
        </View>

        {/* Date */}

        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      {/* Total amount */}

      <View style={styles.row}>
        <View />
        <Text style={styles.totalAmount}>Total Amount: {totalPrice}₮</Text>
      </View>

      {/* Button status */}

      <View style={styles.row}>
        {/* Button */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.setSelectedOrder(props.order);
          }}
        >
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>

        {/* Status */}

        <Status status={status} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    padding: 16,
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 16,
    marginBottom: 4,
  },
  quantityTitle: {
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 12,
    color: 'rgb(150, 148, 149)',
  },
  quantity: {
    color: '#000',
  },
  dateContainer: {
    height: '100%',
  },
  date: {
    fontFamily: 'HelveticaNeue-Light',
    color: 'rgb(150, 148, 149)',
  },
  totalAmount: {
    paddingVertical: 8,
    fontFamily: 'HelveticaNeue-Light',
  },
  button: {
    height: 36,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 12,
  },
});
