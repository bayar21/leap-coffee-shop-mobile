import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../../contexts';
import Logo from '../../icon/logo';
import {NavigationRoutes} from '../../navigations/navigation-params';

export const Header = () => {
  const auth = useAuth();
  const navigation = useNavigation();

  return (
    <View>
      <View style={[styles.container, styles.center]}>
        <Logo />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigationRoutes.MyBagScreen);
        }}
      >
        <Icon name="shopping-bag" size={20} color="black" style={styles.bag} />
        {auth?.user && (
          <View style={[styles.number, styles.center]}>
            <Text style={styles.text}>1</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderBottomWidth: 0.2,
    borderBottomColor: '#2D2A2B',
  },
  bag: {
    position: 'absolute',
    marginTop: -37,
    marginLeft: 350,
  },
  number: {
    position: 'absolute',
    height: 16,
    borderWidth: 0.5,
    borderColor: 'white',
    width: 16,
    backgroundColor: '#D3A762',
    borderRadius: 8,
    marginTop: -43,
    marginLeft: 342,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: 'white', fontWeight: '600'},
});
