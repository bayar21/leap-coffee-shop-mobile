import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import {getCategories} from '../../../api/product';
import {Loader} from '../../../components/loader';
import {Category} from '../../../interfaces';

const screenWidth = Dimensions.get('window').width;

interface Props {
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  categoryId: string;
}

const loadingData: Category[] = [
  {_id: '', name: ''},
  {_id: '', name: ''},
  {_id: '', name: ''},
  {_id: '', name: ''},
  {_id: '', name: ''},
  {_id: '', name: ''},
  {_id: '', name: ''},
  {_id: '', name: ''},
];

export const Categories = (props: Props) => {
  const {categoryId, setCategoryId} = props;
  const [data, setData] = useState<Category[]>(loadingData);

  useEffect(() => {
    const getData = () => {
      getCategories()
        .then(res => {
          setData(res.data);
          if (res.data.length > 0) {
            setCategoryId(res.data[0]._id);
          }
        })
        .catch(err => console.log(err));
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          style={styles.list}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => `${item}${index}`}
          renderItem={({item}) => (
            <>
              {item._id !== '' ? (
                <TouchableOpacity
                  onPress={() => {
                    setCategoryId(item._id);
                  }}
                  style={
                    categoryId === item._id
                      ? styles.selectedCategory
                      : styles.category
                  }
                >
                  <Text
                    style={
                      categoryId === item._id
                        ? styles.selectedCategoryTitle
                        : styles.categoryTitle
                    }
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.loaderContainer}>
                  <View style={styles.loader}>
                    <Loader />
                  </View>
                </View>
              )}
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: 72,
  },
  innerContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  list: {
    width: screenWidth,
    height: 64,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  selectedCategory: {
    marginHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#D3A762',
  },
  category: {
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  selectedCategoryTitle: {
    fontSize: 18,
    color: '#D3A762',
    textTransform: 'capitalize',
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
  },
  categoryTitle: {
    fontSize: 16,
    color: '#2D2A2B',
    textTransform: 'capitalize',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
  },
  loaderContainer: {
    width: 80,
    height: 40,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  loader: {
    height: 20,
  },
});
