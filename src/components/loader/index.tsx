import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

export const Loader = () => {
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return <Animated.View style={[styles.box, {opacity: anim}]} />;
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#e3e3e3',
    overflow: 'hidden',
  },
});
