import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getConfig} from '../../../api/config';
import {Loader} from '../../../components/loader';

interface BannerInterface {
  name: string;
  thumbnail: string;
}

const {width} = Dimensions.get('window');

export const Banner = () => {
  const list = useRef<FlatList | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [banners, setBanners] = useState<BannerInterface[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getConfig('banner')
      .then(res => {
        setBanners(JSON.parse(res.data.data));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(null);
      });
  }, []);

  if (loading === null) {
    return <></>;
  }

  return (
    <>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            ref={list}
            style={styles.list}
            data={banners}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            renderItem={({item}) => (
              <Image style={styles.banner} source={{uri: item.thumbnail}} />
            )}
            keyExtractor={item => item.name}
            horizontal
            onMomentumScrollEnd={({
              nativeEvent: {
                contentOffset: {x: x},
              },
            }) => {
              setSelectedIndex(x / width);
            }}
          />

          {/* Indicator */}

          <TouchableOpacity style={styles.indicators}>
            {banners.map((_item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  list.current?.scrollToIndex({index: index});
                }}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      index === selectedIndex
                        ? '#fff'
                        : 'rgba(255,255,255,0.5)',
                  },
                ]}
              />
            ))}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 6,
    height: 0.6 * (width - 32),
  },
  container: {
    alignItems: 'center',
  },
  list: {
    marginTop: 16,
    width: '100%',
    height: 0.6 * (width - 32),
  },
  banner: {
    width: width - 32,
    marginHorizontal: 16,
    borderRadius: 6,
    height: '100%',
  },
  indicators: {
    position: 'absolute',
    bottom: 8,
    flexDirection: 'row',
  },
  indicator: {
    width: 12,
    height: 12,
    marginHorizontal: 4,
    borderRadius: 6,
  },
});
