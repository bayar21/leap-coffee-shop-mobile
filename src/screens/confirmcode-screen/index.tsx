import {useNavigation} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import {verifyOtp} from '../../api/auth';
import {Button} from '../../components/button';
import VerificationInput from '../../components/VerificationInput';
import {useAuth} from '../../contexts';
import {ChevronLeft} from '../../icon/chevronLeft';
import {NavigationRoutes} from '../../navigations/navigation-params';

interface Props extends NativeStackHeaderProps {
  phone: string;
}

const ConfirmCode = ({route}: Props) => {
  const auth = useAuth();
  const navigation = useNavigation();
  const codeRef = useRef(null);
  const {phone} = route.params;

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const prevScreen = route.params;

  const onPress = () => {
    setLoading(true);
    verifyOtp(phone, otp)
      .then(res => {
        auth?.login(res.data);
        if (!prevScreen) navigation.navigate(NavigationRoutes.HomeScreen);
        else navigation.navigate(NavigationRoutes.MyBagScreen);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
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
                  source={require('../../assets/png/code.png')}
                />
                <Text style={styles.text}>Enter code sent</Text>
                <Text style={styles.text}>to your phone</Text>
                <Text style={[styles.text, styles.smallText]}>
                  We sent it to the number
                </Text>
                <Text style={[styles.text, styles.smallText, styles.phoneText]}>
                  +976 {phone}
                </Text>
              </View>
              <View style={styles.phoneContainer}>
                <VerificationInput
                  input={otp}
                  ref={codeRef}
                  onChange={setOtp}
                />
              </View>
            </View>
            <Button
              text="Enter"
              type="primary"
              disabled={otp.length < 6}
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

export default ConfirmCode;

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
  phoneText: {
    marginTop: 5,
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
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  phone: {
    opacity: 0.5,
    fontSize: 24,
  },

  input: {
    fontSize: 24,
    width: '80%',
    marginLeft: 10,
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
