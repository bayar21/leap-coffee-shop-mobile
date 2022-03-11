import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {getAllStores} from '../api/stores';

export interface storeType {
  storeId: string;
  name: string;
  address: string;
  thumbnail: string;
  weekdays: {
    startTime: number;
    endTime: number;
  };
  weekends: {
    startTime: number;
    endTime: number;
  };
  location: {
    coordinates: number[];
  };
  isOpen: boolean;
  distance: number;
}

interface StoreContextInterface {
  selectedShop: any;
  selectShop: (store: storeType) => void;
  stores: storeType[];
}

const StoreContext = React.createContext<StoreContextInterface>({
  selectedShop: null,
  stores: [],
  selectShop: () => {
    return;
  },
});

export const StoreProvider: React.FC = ({children}) => {
  const [storesReady, setStoresReady] = useState(false);
  const [selectedShop, setSelectedShop] = useState<storeType | null>(null);
  const [stores, setStores] = useState<storeType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await getAllStores({
        lat: 47.9196603905595,
        long: 106.91750530850355,
      });
      setStores(data);
      setStoresReady(true);
    };
    fetchData();
  }, []);

  const selectShop = (store: storeType) => {
    setSelectedShop(store);
  };

  return (
    <StoreContext.Provider
      value={{
        selectShop,
        selectedShop,
        stores,
      }}
    >
      {storesReady && children}
      {!storesReady && (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )}
    </StoreContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const useStore = () => React.useContext(StoreContext);
