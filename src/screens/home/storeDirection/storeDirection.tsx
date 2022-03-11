import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from '@react-native-community/geolocation';

const StoreDirectionScreen = ({navigation, route}) => {
  //   const [destinationLong, destinationLat] =
  //   route.params.data.location.coordinates;

  const GOOGLE_MAPS_APIKEY = 'AIzaSyC_SwwrpszxZXxFw_T2Fh7JIWCyIrkn7ww';
  //   const [CurrentPosition, setCurrentPosition] = useState({});
  const mapRef = useRef<MapView>(null);
  useEffect(() => {
    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
      },
    });
    // if (Platform.OS === 'ios') {
    //   Geolocation.requestAuthorization();
    //   Geolocation.getCurrentPosition(
    //     position => {
    //       const {latitude, longitude} = position.coords;
    //       setCurrentPosition({
    //         latitude,
    //         longitude,
    //       });
    //     },
    //     error => Alert.alert(error.message),
    //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //   );
    // } else {
    // }
  }, []);
  const coordinates = [
    {latitude: 47.915907, longitude: 106.919054},
    {latitude: 47.915364, longitude: 106.913418},
  ];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 47.915907,
          longitude: 106.919054,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="green"
        />
      </MapView>
      {/* <Button title="Get Location" />
      {CurrentPosition ? (
        <>
          <Text>Latitude:{CurrentPosition.latitude}</Text>
          <Text>Longitude:{CurrentPosition.longitude}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )} */}
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {flex: 1},
});

export default StoreDirectionScreen;
