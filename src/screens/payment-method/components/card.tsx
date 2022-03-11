import React, {useState} from 'react';
import {Pressable, View, Image, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CompleteAnimation from './../../../components/animation/CompleteAnimation';
import {qPayData} from '../qPayData';

export const Card = ({item, onClicked}: {item: any; onClicked: () => void}) => {
  const [active, setActive] = useState(false);

  return (
    <Pressable onPress={onClicked}>
      <View style={styles.cardContainer}>
        <Image style={styles.logo} source={item.logo} />
        <View style={styles.txtSection}>
          <Text style={styles.cardTypeText}>{item.bankName}</Text>

          <Text style={styles.detailText}>{item.cardDetails}</Text>
        </View>

        <View style={styles.rightArrow}>
          <Icon name="right" size={20} color="black" />
        </View>
      </View>
      {active && (
        <CompleteAnimation
          onFinished={() => Alert.alert('navigate to Shop direction')}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 12,
    width: '100%',
    borderRadius: 6,
    borderColor: '#eaeaea',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  logo: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  txtSection: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontWeight: '300',
    color: 'black',
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    marginTop: 3,
  },
  cardTypeText: {
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
  },
});
