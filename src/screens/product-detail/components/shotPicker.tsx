import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface shotPickerParams {
  shotNumber: number;
  shotIncrease: () => void;
  shotDecrease: () => void;
}
export const ShotPicker: React.FC<shotPickerParams> = ({
  shotNumber,
  shotIncrease,
  shotDecrease,
}) => {
  return (
    <>
      <Text style={styles.shotTitle}>Shot</Text>
      <View style={styles.shotPicker}>
        <Text style={styles.shotPickerText}>{shotNumber} shots</Text>
        <View style={styles.shotPickerButtonContainer}>
          <TouchableOpacity onPress={shotDecrease}>
            <Text style={styles.shotPickerButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.shotPickerText}>{shotNumber}</Text>
          <TouchableOpacity onPress={shotIncrease}>
            <Text style={styles.shotPickerButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  shotPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  shotTitle: {
    color: 'black',
    paddingVertical: 5,
  },
  shotPickerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  shotPickerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  shotPickerButton: {
    color: '#D3A762',
    fontWeight: 'bold',
  },
});
