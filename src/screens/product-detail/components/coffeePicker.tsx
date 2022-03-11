import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Small from '../../../../assets/svg/Small.svg';
import Sprunce from '../../../../assets/svg/Sprunce.svg';
import Ceder from '../../../../assets/svg/Ceder.svg';
import Redwood from '../../../../assets/svg/Redwood.svg';
import Giant from '../../../../assets/svg/Giant.svg';

const Color = '#D3A762';

interface coffeePickerProps {
  data: {
    id: string;
    name: string;
    price: number;
  };
  id: string;
  onSelect: () => void;
}

export const CoffeePicker: React.FC<coffeePickerProps> = ({
  id,
  data,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {id === data[0]._id ? (
          <TouchableOpacity style={styles.item}>
            <View style={styles.selectedItem}>
              <Small />
            </View>
            <Text style={styles.selectedItemTitle}>Small</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              onSelect({
                id: data[0]._id,
                name: data[0].name,
                price: data[0].price,
              })
            }
          >
            <View>
              <Small />
            </View>
            <Text style={styles.itemTitle}>Small</Text>
          </TouchableOpacity>
        )}
        {id === data[1]._id ? (
          <TouchableOpacity style={styles.item}>
            <View style={styles.selectedItem}>
              <Sprunce />
            </View>
            <Text style={styles.selectedItemTitle}>Spruce</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              onSelect({
                id: data[1]._id,
                name: data[1].name,
                price: data[1].price,
              })
            }
            style={styles.item}
          >
            <View>
              <Sprunce />
            </View>
            <Text style={styles.itemTitle}>Spruce</Text>
          </TouchableOpacity>
        )}
        {id === data[2]._id ? (
          <TouchableOpacity style={styles.item}>
            <View style={styles.selectedItem}>
              <Ceder />
            </View>
            <Text style={styles.selectedItemTitle}>Cedar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              onSelect({
                id: data[2]._id,
                name: data[2].name,
                price: data[2].price,
              })
            }
            style={styles.item}
          >
            <View>
              <Ceder />
            </View>
            <Text style={styles.itemTitle}>Cedar</Text>
          </TouchableOpacity>
        )}
        {id === data[3]._id ? (
          <TouchableOpacity style={styles.item}>
            <View style={styles.selectedItem}>
              <Redwood />
            </View>
            <Text style={styles.selectedItemTitle}>Redwood</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              onSelect({
                id: data[3]._id,
                name: data[3].name,
                price: data[3].price,
              })
            }
            style={styles.item}
          >
            <View>
              <Redwood />
            </View>
            <Text style={styles.itemTitle}>Redwood</Text>
          </TouchableOpacity>
        )}
        {id === data[4]._id ? (
          <TouchableOpacity style={styles.item}>
            <View style={styles.selectedItem}>
              <Giant />
            </View>
            <Text style={styles.selectedItemTitle}>Giant</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              onSelect({
                id: data[4]._id,
                name: data[4].name,
                price: data[3].price,
              })
            }
            style={styles.item}
          >
            <View>
              <Giant />
            </View>
            <Text style={styles.itemTitle}>Giant</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30,
  },
  innerContainer: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  itemTitle: {
    color: '#000',
    fontSize: 13,
    marginTop: 10,
  },
  selectedItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#F9EEDD',
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: Color,
  },
  selectedItemTitle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 12,
    marginTop: 10,
  },
});
