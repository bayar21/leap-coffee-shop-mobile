import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Header = ({number}: {number: number | undefined}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order items ({number ?? ''})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  title: {
    color: '#2D2A2B',
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
  },
});
