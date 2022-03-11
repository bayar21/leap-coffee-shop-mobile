import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Footer = ({total}: {total: number | undefined}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>{total}₮</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  row: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    color: '#2D2A2B',
  },
});
