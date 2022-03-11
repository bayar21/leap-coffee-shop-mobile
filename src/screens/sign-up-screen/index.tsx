import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {postPhone} from '../../api/auth';
import {Button} from '../../components/button';
import {useAuth} from '../../contexts';
import {ChevronLeft} from '../../icon/chevronLeft';
import {NavigationRoutes} from '../../navigations/navigation-params';

import {useCart} from '../../contexts';
const SignUpScreen = ({route}: any) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');

  const auth = useAuth();
  const prevScreen = route.params?.prevScreen;
  const onPress = () => {
    setLoading(true);
    postPhone(phone)
      .then(() => {
        navigation.navigate(NavigationRoutes.ConfirmCodeScreen, {
          phone: phone,
          prevScreen: prevScreen,
        });
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ChevronLeft height={20} width={12} color="#2D2A2B" />
        </TouchableOpacity>
      </View>
      {!loading && (
        <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.innerContainer}
            keyboardVerticalOffset={150}
          >
            <View style={styles.centered}>
              <View style={styles.textContainer}>
                <Image
                  style={styles.img}
                  source={require('../../assets/png/phone.png')}
                />
                <Text style={styles.text}>Enter your</Text>
                <Text style={styles.text}>mobile number</Text>
                <Text style={[styles.text, styles.smallText]}>
                  We will send confirmation code
                </Text>
              </View>
              <View style={styles.phoneContainer}>
                <Text style={styles.phone}>+ 976</Text>
                <TextInput
                  maxLength={8}
                  keyboardType="decimal-pad"
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.input}
                />
              </View>
            </View>
            <Button
              text="Enter"
              type="primary"
              disabled={phone.length < 8}
              onPress={onPress}
            />
          </KeyboardAvoidingView>
        </Pressable>
      )}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 36,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  textContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 40,
    width: 40,
    marginBottom: 20,
  },

  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
    lineHeight: 32,
  },

  smallText: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.5,
    lineHeight: 17,
    marginTop: 15,
  },

  phoneContainer: {
    paddingTop: '10%',
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  phone: {
    opacity: 0.5,
    fontSize: 24,
    marginRight: 10,
  },

  input: {
    fontSize: 24,
    width: 120,
    borderBottomColor: 'rgba(158, 150, 150, .5)',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },

  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
