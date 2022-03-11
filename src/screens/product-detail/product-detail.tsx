import React, {useState, useRef, useMemo, useCallback} from 'react';

import {
  Animated,
  Dimensions,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  NavigationRoutes,
  NavigationParamList,
} from '../../navigations/navigation-params';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';

import {
  BottomModal,
  SeactionHeader,
  ShotPicker,
  CoffeePicker,
} from './components';

import {Button} from '../../components/button';
import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCart} from '../../contexts';
import {OrderProduct} from '../../interfaces';

const {height} = Dimensions.get('window');

const headerMaxHeight = 375;
const headerMinHeight = 70;
const gap = 191;

type Props = NativeStackScreenProps<
  NavigationParamList,
  NavigationRoutes.ProductDetailScreen
>;

export function ProductDetail({navigation, route}: Props) {
  const cart = useCart();
  const {
    _id,
    name,
    thumbnail,
    duration,
    basePrice,
    sizes,
    creamTypes,
    foamTypes,
    milkTypes,
  } = route.params;

  const [coffeeSize, setCoffeeSize] = useState({
    name: sizes[0].name,
    price: sizes[0].price,
  });

  const [shots, setShots] = useState(1);
  const [foam, setFoam] = useState({
    name: foamTypes[0].name,
    price: foamTypes[0].price,
  });
  const [milk, setMilk] = useState({
    name: milkTypes[0].name,
    price: milkTypes[0].price,
  });
  const [cream, setCream] = useState({
    name: creamTypes[0].name,
    price: creamTypes[0].price,
  });
  const [bottomModalTitle, setBottomModalTitle] = useState('');
  type sheetType = {
    list: string[];
    setter: React.Dispatch<React.SetStateAction<string>> | null;
  };
  const [sheet, setSheet] = useState<sheetType>({
    list: [],
    setter: () => {
      console.log('');
    },
  });

  const ORDER: OrderProduct = {
    productId: _id,
    name: name,
    shots: shots,
    thumbnail: thumbnail,
    size: coffeeSize.name,
    foam: foam.name,
    milk: milk.name,
    cream: cream.name,
    price:
      shots *
      (basePrice + coffeeSize.price + foam.price + milk.price + cream.price),
  };

  const insets = useSafeAreaInsets();

  const shotDecrease = () => {
    shots > 1 ? setShots(shots - 1) : null;
  };
  const shotIncrease = () => {
    setShots(shots + 1);
  };
  // scroll animation
  const scrollY = useRef(new Animated.Value(0)).current;

  //Bottom Sheet
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [1, 400], []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* TopBar */}
      <Animated.View
        style={[
          styles.topNavbar,
          {
            backgroundColor: scrollY.interpolate({
              inputRange: [0, headerMaxHeight - gap],
              outputRange: ['rgba(0,0,0,0)', 'rgba(255,255,255,255)'],
            }),
            top: insets.top,
          },
        ]}
      >
        <Animated.View style={styles.topBarInner}>
          <Animated.View
            style={[
              styles.topNavbarItem,
              {
                backgroundColor: scrollY.interpolate({
                  inputRange: [0, headerMaxHeight - gap],
                  outputRange: ['#ece7e77e', '#dddbdb'],
                }),
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(NavigationRoutes.HomeScreen)}
            >
              <Icon name="chevron-left" size={15} color="#ffffff" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.topNavbarItem,
              {
                backgroundColor: scrollY.interpolate({
                  inputRange: [0, headerMaxHeight - gap],
                  outputRange: ['#ece7e77e', '#dddbdb'],
                }),
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(NavigationRoutes.MyBagScreen)}
            >
              {cart?.items.length > 0 ? (
                <View style={styles.badgeConainer}>
                  <Text style={styles.badgeText}>{cart?.items.length}</Text>
                </View>
              ) : null}
              <Icon name="shopping-bag" size={15} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
      >
        <Image
          style={styles.headerbackground}
          source={{
            uri: thumbnail,
          }}
        />
        {/* MainBody */}
        <View style={styles.innerContainer}>
          <SeactionHeader title="Size options" />
          <CoffeePicker
            data={sizes}
            id={coffeeSize.id}
            onSelect={select => setCoffeeSize(select)}
          />
          <SeactionHeader title="Flavor changes" />
          <BottomModal
            title="Milk"
            value={milk.name}
            onPress={() => {
              setSheet({
                list: milkTypes,
                setter: props => {
                  setMilk(props);
                },
              });
              handleSnapPress(1);
              setBottomModalTitle('Milk');
            }}
          />
          <ShotPicker
            shotNumber={shots}
            shotIncrease={shotIncrease}
            shotDecrease={shotDecrease}
          />
          <BottomModal
            title="Foam"
            value={foam.name}
            onPress={() => {
              setSheet({
                list: foamTypes,
                setter: props => {
                  setFoam(props);
                },
              });
              handleSnapPress(1);
              setBottomModalTitle('Foam');
            }}
          />
          <BottomModal
            title="Whipping cream"
            value={cream.name}
            onPress={() => {
              setSheet({
                list: creamTypes,
                setter: props => {
                  setCream(props);
                },
              });
              handleSnapPress(1);
              setBottomModalTitle('Cream');
            }}
          />
        </View>
        <View style={styles.gap} />
      </Animated.ScrollView>
      {/* Fixed Button */}
      <View style={[styles.footer, {bottom: insets.bottom}]}>
        <Button
          type="primary"
          text="Add To Bag"
          onPress={() => {
            cart?.addItem(ORDER);
            navigation.navigate(NavigationRoutes.MyBagScreen);
          }}
        />
      </View>
      {/* Bottom Sheet */}
      <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetHeaderTitle}>
              {bottomModalTitle}
            </Text>
            <TouchableOpacity onPress={() => sheetRef.current?.close()}>
              <Text style={styles.bottomSheetHeaderClose}>X</Text>
            </TouchableOpacity>
          </View>
          {sheet.list.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  sheet.setter({name: item.name, price: item.price});
                  sheetRef.current?.close();
                  setSheet({...sheet, list: []});
                }}
              >
                <View style={styles.bottomSheetItemContainer}>
                  <Text style={styles.bottomSheetItem}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewStyle: {
    flex: 1,
  },
  innerContainer: {
    minHeight: height - gap,
    paddingHorizontal: 10,
  },
  headerbackground: {
    width: '100%',
    height: headerMaxHeight,
  },
  topNavbar: {
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 3,
  },
  topBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    height: headerMinHeight,
  },
  topNavbarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  badgeConainer: {
    zIndex: 100,
    width: 20,
    height: 20,
    backgroundColor: '#D3A762',
    borderWidth: 1,
    borderColor: 'rgba(240, 240, 240, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: -15,
    top: -15,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  // Fixed footer button
  button: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  footer: {
    position: 'absolute',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  modalContainer: {
    height: '50%',
    width: '100%',
  },
  coffeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  coffeeName: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#2D2A2B',
  },
  coffeeSelected: {
    fontWeight: 'bold',
    fontSize: 14,
    height: 40,
    textAlign: 'center',
    paddingVertical: 5,
    color: '#2D2A2B',
  },
  coffeeSelectedBorder: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4EBDD',
    borderWidth: 1,
    borderRadius: 400,
    borderColor: '#D3A762',
  },
  milkContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  milkText: {
    color: '#000',
  },

  // shot picker
  shotPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.3,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  shotTitle: {
    color: 'black',
    paddingVertical: 5,
  },
  shotPickerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  shotPickerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  shotPickerButton: {
    color: '#D3A762',
    fontWeight: 'bold',
  },

  // Bottom shett
  bottomSheetContainer: {
    padding: 5,
  },
  bottomSheetItemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    margin: 10,
    height: 30,
    justifyContent: 'space-between',
  },
  bottomSheetItem: {
    color: '#000',
  },
  bottomSheetHeader: {
    paddingHorizontal: 10,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSheetHeaderTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomSheetHeaderClose: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
  },
  gap: {
    height: 80,
    width: '100%',
  },
});
