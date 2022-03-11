import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, Dimensions} from 'react-native';
import {LoadingCard} from './loadingCard';
import {ProductCard} from './productCard';
import {getSpecialProducts} from '../../../api/product';
import {Loader} from '../../../components/loader';
import {Product} from '../../../interfaces';

const screenWidth = Dimensions.get('window').width;

interface Specials {
  name: string;
  productIds: Product[];
}

const loadingData: Specials[] = [
  {
    name: '',
    productIds: [
      {
        name: '',
        _id: '',
        thumbnail: '',
        basePrice: 0,
        duration: 0,
        sizes: [],
        milkTypes: [],
        foamTypes: [],
        creamTypes: [],
      },
      {
        name: '',
        _id: '',
        thumbnail: '',
        basePrice: 0,
        duration: 0,
        sizes: [],
        milkTypes: [],
        foamTypes: [],
        creamTypes: [],
      },
      {
        name: '',
        _id: '',
        thumbnail: '',
        basePrice: 0,
        duration: 0,
        sizes: [],
        milkTypes: [],
        foamTypes: [],
        creamTypes: [],
      },
      {
        name: '',
        _id: '',
        thumbnail: '',
        basePrice: 0,
        duration: 0,
        sizes: [],
        milkTypes: [],
        foamTypes: [],
        creamTypes: [],
      },
      {
        name: '',
        _id: '',
        thumbnail: '',
        basePrice: 0,
        duration: 0,
        sizes: [],
        milkTypes: [],
        foamTypes: [],
        creamTypes: [],
      },
    ],
  },
];

export const ProductFlatList = () => {
  const [data, setData] = useState<Specials[]>(loadingData);

  useEffect(() => {
    const getData = () => {
      setData(loadingData);
      getSpecialProducts()
        .then(res => {
          setData(res.data);
        })
        .catch(err => console.log(err));
    };
    getData();
  }, []);

  return (
    <View>
      {data.map((specials: Specials) => (
        <View key={specials.name}>
          {/* Header */}

          <View style={styles.header}>
            <View style={styles.headerTitle}>
              {specials.name === '' ? (
                <View style={styles.headerTitleLoader}>
                  <Loader />
                </View>
              ) : (
                <Text style={styles.categoryTitle}>{specials.name}</Text>
              )}
            </View>
          </View>

          {/* Products */}

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            data={specials.productIds}
            renderItem={({item, index}) => {
              if (specials.name !== '') {
                return (
                  <View style={[index === 0 && styles.ml, styles.mr]}>
                    <ProductCard {...item} width={screenWidth / 2 - 32} />
                  </View>
                );
              } else {
                return (
                  <View style={[index === 0 && styles.ml, styles.mr]}>
                    <LoadingCard width={screenWidth / 2 - 32} />
                  </View>
                );
              }
            }}
            keyExtractor={(_item, index) => `${index}`}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    height: 20,
    width: '100%',
    justifyContent: 'center',
  },
  headerTitleLoader: {
    height: 12,
    width: '50%',
  },
  categoryTitle: {
    textTransform: 'capitalize',
    fontSize: 16,
    color: '#2D2A2B',
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
  },
  list: {
    width: screenWidth,
    marginBottom: 24,
  },
  mr: {
    marginRight: 16,
  },
  ml: {
    marginLeft: 16,
  },
  card: {
    marginLeft: 16,
    marginVertical: 12,
  },
});
