import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  ImageSourcePropType,
  SectionList,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import {Card} from './components';

type BankCardTypes =
  | 'Trade and Development bank'
  | 'Golomt'
  | 'Khan bank'
  | 'Bogd bank'
  | 'State bank'
  | 'Most money'
  | 'Chinggis khaan bank'
  | 'National investment bank'
  | 'Capitron bank'
  | 'Xac bank';

type CardType = 'Credit' | 'Debit' | 'Social Pay' | 'Q-Pay';

export interface BankCardInfo {
  bankName: BankCardTypes;
  cardType: CardType;
  cardDetails: string;
  logo: ImageSourcePropType;
  id: string;
}

export interface paymentMethodDataType {
  title: string;
  data: BankCardInfo[];
}

const paymentMethodData: paymentMethodDataType[] = [
  {
    title: 'Q-Pay',
    data: [
      {
        bankName: 'Trade and Development bank',
        cardType: 'Debit',
        cardDetails: 'Visa     **********3306',
        logo: require('./logoBanks/banks/tdb.png'),
        id: '1',
      },
      {
        bankName: 'Khan bank',
        cardType: 'Debit',
        cardDetails: 'Visa     **********3306',
        logo: require('./logoBanks/banks/khaan.png'),
        id: '3',
      },
      {
        bankName: 'Bogd bank',
        cardType: 'Debit',
        cardDetails: 'Visa     **********3306',
        logo: require('./logoBanks/banks/bogd.png'),
        id: '4',
      },
      {
        bankName: 'State bank',
        cardType: 'Debit',
        cardDetails: 'MasterCard     **********3306',
        logo: require('./logoBanks/banks/statebank.png'),
        id: '5',
      },
      {
        bankName: 'Xac bank',
        cardType: 'Debit',
        cardDetails: 'Visa     **********3306',
        logo: require('./logoBanks/banks/khas.png'),
        id: '6',
      },
      {
        bankName: 'National investment bank',
        cardType: 'Debit',
        cardDetails: 'Visa     **********3306',
        logo: require('./logoBanks/banks/nibank.jpeg'),
        id: '7',
      },
      {
        bankName: 'Chinggis khaan bank',
        cardType: 'Debit',
        cardDetails: 'Visa     **********3306',
        logo: require('./logoBanks/banks/ckbank.png'),
        id: '11',
      },
      {
        bankName: 'Capitron bank',
        cardType: 'Debit',
        cardDetails: 'Visa     **********3306',
        logo: require('./logoBanks/banks/capitron.png'),
        id: '12',
      },
    ],
  },

  {
    title: 'Social Pay',
    data: [
      {
        bankName: 'Xac bank',
        cardType: 'Q-Pay',
        cardDetails: 'you@nest.mn',
        logo: require('./logoBanks/othermethods/socialpay.png'),
        id: '9',
      },
      {
        bankName: 'Most money',
        cardType: 'Q-Pay',
        cardDetails: 'you@nest.mn',
        logo: require('./logoBanks/othermethods/socialpay.png'),
        id: '10',
      },
    ],
  },
];

const PaymentMethodScreen = ({route}) => {
  const qPayData = route.params;
  const renderItem = ({item, index}: {item: BankCardInfo; index: number}) => {
    return (
      <Card
        item={item}
        onClicked={() => {
          gotToPayment(item.bankName);
        }}
      />
    );
  };

  const gotToPayment = async (bankName: string) => {
    const deeplink = qPayData.urls.find(x => x.name === bankName) || {
      link: 'link',
    };
    try {
      const supported = await Linking.canOpenURL(deeplink.link);
      Alert.alert(supported.toString());
      if (supported) {
        await Linking.openURL(deeplink.link);
      } else {
        Alert.alert(`Don't know how to open this URL: ${deeplink.link}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        sections={paymentMethodData}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({section}) => (
          <View style={styles.bankCardContainerHeader}>
            <Text style={styles.headerText}>{section.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bankCardContainerHeader: {
    marginTop: 16,
  },
  headerText: {
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
  },
});
