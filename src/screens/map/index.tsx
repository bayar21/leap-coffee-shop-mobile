import React, {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Camera,
  EdgePadding,
} from 'react-native-maps';
import {storeType, useStore} from '../../contexts';
import {Shop} from '../../screens/home/components';
import BottomSheet from '@gorhom/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {Card} from './components';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width - 48;

const GOOGLE_MAPS_APIKEY = 'AIzaSyC_SwwrpszxZXxFw_T2Fh7JIWCyIrkn7ww';

interface ModalInterface {
  data: storeType;
  onClose: () => void;
  onClickShop: (data: storeType) => void;
}

const ModalShop = (props: ModalInterface) => {
  const {data, onClose, onClickShop} = props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      onClose();
    }
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <Shop data={data} onClickShop={onClickShop} />
    </BottomSheet>
  );
};

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [shopDetail, setShopDetail] = useState(null);
  const [storeIndex, setStoreIndex] = useState(0);
  const {stores, selectShop} = useStore([]);
  const insets = useSafeAreaInsets();
  const [activeShopDirection, setActiveShopDirection] =
    useState<storeType | null>(null);
  const [myLocation, setMyLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [showBtn, setShowBtn] = useState(false);

  const initialCamera: Camera = {
    center: {
      latitude: stores[0].location.coordinates[1],
      longitude: stores[0].location.coordinates[0],
    },
    pitch: 60,
    heading: 0,
    altitude: 14,
    zoom: 14,
  };
  const mapPadding: EdgePadding = {
    top: 0,
    right: 0,
    bottom: 300,
    left: 0,
  };

  const clickedShop = (shop: storeType) => {
    setMyLocation({
      latitude: 47.92123,
      longitude: 106.918556,
    });
    setActiveShopDirection(shop);
    setShopDetail(null);
    setShowBtn(true);
  };

  useEffect(() => {
    if (activeShopDirection) {
      const coordinates = [
        myLocation,
        {
          latitude: activeShopDirection.location.coordinates[1],
          longitude: activeShopDirection.location.coordinates[0],
        },
      ];

      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: {
          top: insets.top + 30,
          right: 30,
          bottom: 30,
          left: 30,
        },
      });
    }
  }, [activeShopDirection]);

  return (
    <View style={styles.container}>
      {stores && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          mapPadding={mapPadding}
          initialCamera={initialCamera}
        >
          {stores.map((store, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: store.location.coordinates[1],
                  longitude: store.location.coordinates[0],
                }}
              >
                {index === storeIndex ? (
                  <Image
                    source={require('../../assets/png/markerYellow.png')}
                    style={styles.markerImg}
                  />
                ) : (
                  <Image
                    source={require('../../assets/png/markerBlack.png')}
                    style={styles.markerImg}
                  />
                )}
              </Marker>
            );
          })}

          {activeShopDirection && (
            <>
              <Marker coordinate={myLocation} />
              <MapViewDirections
                origin={myLocation}
                destination={{
                  latitude: activeShopDirection.location.coordinates[1],
                  longitude: activeShopDirection.location.coordinates[0],
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="green"
              />
            </>
          )}
        </MapView>
      )}

      {showBtn && (
        <Pressable
          style={styles.customBackBtn}
          onPress={() => {
            setShopDetail(null);
            setActiveShopDirection(null);
            setShowBtn(false);
          }}
        >
          <Icon name="left" size={30} />
        </Pressable>
      )}

      {!activeShopDirection && (
        <View style={styles.listContainer}>
          <ScrollView
            horizontal
            snapToInterval={CARD_WIDTH}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            onScroll={({
              nativeEvent: {
                contentOffset: {x: x},
              },
            }) => {
              let index = Math.floor(x / CARD_WIDTH);

              if (index < 0) index = 0;
              if (index >= stores.length) {
                index = stores.length - 1;
              }

              console.log(index);
              setStoreIndex(index);
              mapRef.current?.animateCamera(
                {
                  center: {
                    latitude: stores[index].location.coordinates[1],
                    longitude: stores[index].location.coordinates[0],
                  },
                  zoom: 14,
                },
                {duration: 500},
              );
            }}
          >
            {stores.map((store, index) => (
              <Card
                key={index}
                store={store}
                selectShop={selectShop}
                setShopDetail={setShopDetail}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {shopDetail && (
        <ModalShop
          onClickShop={clickedShop}
          data={shopDetail}
          onClose={() => setShopDetail(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 16,
    paddingRight: 32,
    paddingBottom: 32,
  },
  list: {
    width: '100%',
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
  },
  markerImg: {
    width: 40,
    height: 40,
  },
  customBackBtn: {
    position: 'absolute',
    margin: 50,
    height: 50,
    width: 50,
    paddingRight: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});

export default MapScreen;
