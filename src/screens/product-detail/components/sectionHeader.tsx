import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type SeactionHeaderProps = {
  title: string;
};
export const SeactionHeader: React.FC<SeactionHeaderProps> = ({title}) => {
  return (
    <View style={styles.seactionHeader}>
      <Text style={styles.seactionHeaderTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  seactionHeader: {
    height: 30,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#D3A762',
    marginVertical: 10,
  },
  seactionHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2D2A2B',
  },
});
