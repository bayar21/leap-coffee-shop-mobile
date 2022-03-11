import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../../components/productCard';

import SearchInput from '../../components/searchInput';

const DATA = [
  {
    thumbnail:
      'https://3f4c2184e060ce99111b-f8c0985c8cb63a71df5cb7fd729edcab.ssl.cf2.rackcdn.com/media/14066/redwinespiked-hotchocolate.jpg',
    title: 'hot chocolate',
    price: 3.27,
  },
  {
    thumbnail:
      'https://3f4c2184e060ce99111b-f8c0985c8cb63a71df5cb7fd729edcab.ssl.cf2.rackcdn.com/media/14066/redwinespiked-hotchocolate.jpg',
    title: 'hot chocolate',
    price: 3.27,
  },
  {
    thumbnail:
      'https://3f4c2184e060ce99111b-f8c0985c8cb63a71df5cb7fd729edcab.ssl.cf2.rackcdn.com/media/14066/redwinespiked-hotchocolate.jpg',
    title: 'hot chocolate',
    price: 3.27,
  },
  {
    thumbnail:
      'https://3f4c2184e060ce99111b-f8c0985c8cb63a71df5cb7fd729edcab.ssl.cf2.rackcdn.com/media/14066/redwinespiked-hotchocolate.jpg',
    title: 'hot chocolate',
    price: 3.27,
  },
  {
    thumbnail:
      'https://3f4c2184e060ce99111b-f8c0985c8cb63a71df5cb7fd729edcab.ssl.cf2.rackcdn.com/media/14066/redwinespiked-hotchocolate.jpg',
    title: 'hot chocolate',
    price: 3.27,
  },
];

const Categories = ['all', 'special', 'hot', 'cold', 'food', 'blending'];

const Category = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setSelected(props.index);
      }}
      style={
        props.selected === props.index
          ? styles.selectedCategory
          : styles.category
      }
    >
      <Text
        style={
          props.selected === props.index
            ? styles.selectedCategoryTitle
            : styles.categoryTitle
        }
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const ListScreen = () => {
  const [selected, setSelected] = useState(0);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}
        ></TouchableOpacity>
        <SearchInput />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
        data={Categories}
        renderItem={({item, index}) => (
          <Category
            title={item}
            index={index}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      />
      <FlatList
        numColumns={2}
        style={styles.list}
        data={DATA}
        renderItem={({item}) => (
          <View style={styles.card}>
            <ProductCard {...item} />
          </View>
        )}
        keyExtractor={(_item, index) => `${index}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  input: {
    backgroundColor: '#fff',
    flex: 1,
    height: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  categories: {
    width: '100%',
    marginBottom: 20,
    height: 40,
  },
  selectedCategory: {
    marginHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#D3A762',
  },
  category: {
    marginHorizontal: 24,
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
  card: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  backBtn: {
    height: 48,
    width: 48,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListScreen;
