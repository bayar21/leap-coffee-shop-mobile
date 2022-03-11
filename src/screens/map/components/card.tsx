import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Button} from '../../../components';
import {Detail, Order} from '../../../icon';
import {NavigationRoutes} from '../../../navigations/navigation-params';

const {width} = Dimensions.get('window');

export const Card = ({store, selectShop, setShopDetail}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.card}>
        <View>
          <Image source={{uri: store.thumbnail}} style={styles.thumbnail} />
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{store.name}</Text>
              <Text style={styles.address}>
                {store.address} • {Math.floor(store.distance * 1000)}m
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setShopDetail(store);
              }}
            >
              <Detail width={32} height={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.innerContainer, styles.borderTop]}>
          <View style={styles.row}>
            <View style={store.isOpen ? styles.open : styles.closed}>
              <Text
                style={store.isOpen ? styles.statusOpen : styles.statusClosed}
              >
                {store.isOpen ? 'Open' : 'Closed'}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>
                {store.weekdays.startTime}am - {store.weekdays.endTime}am
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                height={30}
                text="Order"
                type="primary"
                onPress={() => {
                  selectShop(store);
                  navigation.navigate(NavigationRoutes.MainBottomTabBar);
                }}
              >
                <Text style={styles.buttonText}>Order</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 64,
    marginLeft: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  thumbnail: {
    height: 120,
    resizeMode: 'cover',
    backgroundColor: '#f3f3f3',
  },
  innerContainer: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#fafafa',
  },
  titleContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '600',
    marginBottom: 6,
  },
  address: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
  },
  open: {
    justifyContent: 'center',
    backgroundColor: 'rgba(42, 169, 82, 0.1)',
    height: 30,
  },
  closed: {
    justifyContent: 'center',
    backgroundColor: 'rgba(214, 83, 62, 0.1)',
    height: 30,
  },
  statusOpen: {
    paddingHorizontal: 6,
    justifyContent: 'center',
    fontSize: 14,
    color: '#2AA952',
    fontWeight: '600',
  },
  statusClosed: {
    paddingHorizontal: 6,
    justifyContent: 'center',
    fontSize: 14,
    color: '#D6533E',
    fontWeight: '600',
  },
  timeContainer: {
    height: 30,
    justifyContent: 'center',
  },
  time: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '600',
    marginHorizontal: 16,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonText: {
    fontSize: 12,
  },
});
