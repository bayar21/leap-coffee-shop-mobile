import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

interface bottomModalProps {
  title: string;
  value: string;
  onPress: () => void;
}

export const BottomModal: React.FC<bottomModalProps> = ({
  title,
  value,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.dropdown}>
          <Text style={styles.text}>{value}</Text>
          <Text style={styles.icon}>{'Ⅴ'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  title: {
    paddingVertical: 5,
    color: 'black',
  },
  dropdown: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  text: {
    color: '#000',
  },
  icon: {
    color: 'grey',
  },
});
