import React from 'react';
import {Text, StyleSheet} from 'react-native';

const colors = ['#2F80ED', '#2AA952', '#F01F0E'];

export const Status = ({status}: {status: string}) => {
  return <Text style={styles(status).text}>{status}</Text>;
};

const styles = (status: string) =>
  StyleSheet.create({
    text: {
      textTransform: 'capitalize',
      fontFamily: 'HelveticaNeue-Light',
      color:
        status === 'success'
          ? colors[1]
          : status === 'canceled'
          ? colors[2]
          : colors[0],
    },
  });
