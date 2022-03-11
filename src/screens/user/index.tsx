import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Header} from '../../components';
import {useAuth} from '../../contexts';
import {NavigationRoutes} from '../../navigations/navigation-params';

const UserScreen = () => {
  const navigation = useNavigation();
  const auth = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {auth?.user && (
        <>
          <View style={styles.userContainer}>
            <FastImage
              style={styles.thumbnail}
              source={{
                uri: 'https://i.pravatar.cc/300',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.phone}>{auth?.user.phone}</Text>
          </View>
          <View style={styles.innerContainer}>
            <Button onPress={auth?.logout} text="Log out" />
          </View>
        </>
      )}
      {!auth?.user && (
        <View style={styles.loginContainer}>
          <Button
            onPress={() => {
              navigation.navigate(NavigationRoutes.SignUpScreen);
            }}
            text="Log in"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  userContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  thumbnail: {
    height: 62,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#e3e3e3',
  },
  phone: {
    paddingTop: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#2D2A2B',
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  loginContainer: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },
});

export default UserScreen;
