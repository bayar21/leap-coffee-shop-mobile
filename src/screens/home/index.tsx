import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';

import {Header, Location} from '../../components';
import {
  ProductFlatList,
  ProductCard,
  Categories,
  LoadingCard,
  Banner,
} from './components';
import {Product} from '../../interfaces';
import {getProductsByCategory} from '../../api/product';

import {useStore, storeType} from '../../contexts';

const screenWidth = Dimensions.get('window').width;
const loadingData: Product[][] = [
  [
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
  [
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
  [
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
];

interface CategoryProducts {
  categoryId: string;
  data: Product[][];
}

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState('');
  const [data, setData] = useState<CategoryProducts[]>([]);
  const {selectedShop} = useStore();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getProductsByCategory(categoryId)
        .then(res => {
          const arr: Product[][] = [];
          for (let i = 0; i < res.data.length; i += 2) {
            if (i !== res.data.length - 1) {
              arr.push([res.data[i], res.data[i + 1]]);
            } else {
              arr.push([res.data[i]]);
            }
          }
          setData(prev => [...prev, {categoryId: categoryId, data: arr}]);
          setLoading(false);
        })
        .catch(err => console.log(err));
    };
    if (!data.some(el => el.categoryId === categoryId) && categoryId !== '') {
      getData();
    }
  }, [categoryId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[3]}>
        {/* Header */}

        <View style={styles.topBar}>
          <Header />
          <Location selectedShop={selectedShop} />
        </View>

        {/* Banner */}

        <Banner />

        {/* Special Products */}

        <ProductFlatList />

        {/* Categories */}

        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />

        {/* Loading Products */}

        {!loading && (
          <View style={styles.products}>
            {data
              .find(el => el.categoryId === categoryId)
              ?.data.map((product, index) => (
                <View key={index} style={styles.row}>
                  {product.map(item => (
                    <View key={item._id} style={styles.card}>
                      <ProductCard {...item} width={screenWidth / 2 - 24} />
                    </View>
                  ))}
                </View>
              ))}
          </View>
        )}

        {/* Loaded Products */}

        {loading && (
          <View style={styles.products}>
            {loadingData.map((product, index) => (
              <View key={index} style={styles.row}>
                {product.map((_item, i) => (
                  <View key={i} style={styles.card}>
                    <LoadingCard width={screenWidth / 2 - 24} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    height: 120,
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  innerContainer: {
    flex: 1,
  },
  products: {
    minHeight: 500,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  input: {
    position: 'absolute',
    bottom: -24,
    left: 32,
    width: screenWidth - 64,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  card: {
    marginLeft: 16,
    marginVertical: 12,
  },
  empty: {
    width: 0,
  },
});

export default HomeScreen;
