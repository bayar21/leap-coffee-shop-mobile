import React, {useState, useRef} from 'react';
import {Image, StyleSheet, View, Text, Dimensions} from 'react-native';
import {storeType} from '../../../contexts';
import {MapMarker, Phone, TimeLine} from '../../../icon';
import {Button} from '../../../components';
import {NavigationRoutes} from '../../../navigations/navigation-params';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export const Shop = ({
  data,
  onClickShop,
}: {
  data: storeType;
  onClickShop: any;
}) => {
  const navigation = useNavigation();
  const available = StyleSheet.create({
    cc: {
      backgroundColor: data.isOpen
        ? 'rgba(42, 169, 82, 0.7)'
        : 'rgba(180, 20, 0, 0.6)',
      position: 'absolute',
      right: 10,
      bottom: 10,
      padding: 12,
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <Image source={{uri: data.thumbnail}} style={styles.img} />
        <View style={available.cc}>
          <Text style={[styles.fontWeight, styles.text]}>
            {data.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
      <View style={[styles.textContainer]}>
        <View style={[styles.flexRow, styles.mb5]}>
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.row}>
            <MapMarker width={15} height={15} color="black" />
            <Text style={styles.fontWeight}>
              {' '}
              {Math.floor(data.distance * 1000)}m
            </Text>
          </View>
        </View>
        <Text>{data.address}</Text>
        <View style={[styles.flexRow, styles.mv10]}>
          <View style={styles.flex1}>
            <Button text="Call" type="iconSecondary">
              <Phone height={20} width={20} color="#2D2A2B" />
            </Button>
          </View>
          <View style={{flex: 1.5, marginLeft: 10}}>
            <Button
              text="Direction"
              type="primary"
              onPress={() => {
                onClickShop(data);
                // console.log(data.location.coordinates);
              }}
            />
          </View>
        </View>
      </View>
      <View style={[styles.textContainer]}>
        <View style={styles.row}>
          <TimeLine width={18} height={18} color="black" />
          <Text style={[styles.fontWeight, styles.mb20, styles.ml5]}>
            Schedule
          </Text>
        </View>
        <View style={[styles.flexRow, styles.mb10]}>
          <Text>Weekdays</Text>
          <Text>
            {data.weekdays.startTime}am - {data.weekdays.endTime}pm
          </Text>
        </View>
        <View style={[styles.flexRow, styles.mb20]}>
          <Text>Weekend</Text>
          <Text>
            {data.weekends.startTime}am - {data.weekends.endTime}pm
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex105: {
    flex: 1.5,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  mv10: {
    marginVertical: 10,
  },
  textContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#aeaeae',
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  fontWeight: {
    fontWeight: '600',
  },

  text: {
    color: 'white',
    fontSize: 16,
  },
  img: {
    width: width,
    height: 200,
  },
});
