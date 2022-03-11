import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {TabView, TabBar, Route} from 'react-native-tab-view';
import {getOrdersByStatus} from '../../api/order';
import {Order} from '../../interfaces';
import {Orders} from './components';

interface TabData {
  status: string;
  data: Order[];
}

const OrderScreen = () => {
  const [orders, setOrders] = useState<TabData[]>([]);
  const [index, setIndex] = useState(0);

  const getOrders = (status: string | undefined) => {
    if (status) {
      getOrdersByStatus(status)
        .then(res => {
          setOrders(prev => [...prev, {status: status, data: res.data}]);
          console.log(res.data);
        })
        .catch(err => {
          setOrders([]);
          console.log(err);
        });
    }
  };

  const routes: Route[] = [
    {key: '1', title: 'processing'},
    {key: '2', title: 'success'},
    {key: '3', title: 'canceled'},
  ];

  useEffect(() => {
    if (!orders.some(item => item.status === routes[index].title)) {
      getOrders(routes[index].title);
    }
  }, [index]);

  const renderScene = ({route}: {route: Route}) => {
    switch (route.key) {
      case '1':
        return (
          <Orders
            orders={orders.find(item => item.status === 'processing')?.data}
          />
        );
      case '2':
        return (
          <Orders
            orders={orders.find(item => item.status === 'success')?.data}
          />
        );
      case '3':
        return (
          <Orders
            orders={orders.find(item => item.status === 'canceled')?.data}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.tabView}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.tabBarIndicator}
            labelStyle={styles.tabBarLabel}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabView: {
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tabBarLabel: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: 'black',
  },
  tabBarIndicator: {
    backgroundColor: '#d3a762',
  },
  pressableButton: {
    marginTop: '20%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 35,
    paddingVertical: 12,
    alignItems: 'center',
  },
  item: {
    width: '94%',
    padding: '4%',
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 140,
    margin: '3%',
  },
  itemContainer: {
    width: '94%',
    padding: '4%',
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    margin: '3%',
  },
  itemFont: {
    fontFamily: 'HelveticaNeue-Light',
  },
});

export default OrderScreen;
