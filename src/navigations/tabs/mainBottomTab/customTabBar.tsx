import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuth} from '../../../contexts/AuthContext';
import {HomeIcon, OrderIcon, UserIcon} from './tab-Icons';

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const activeColor = '#D3A762';
  const inactiveColor = '#838383';
  const insets = useSafeAreaInsets();
  const {user} = useAuth();
  const Icons = [HomeIcon, OrderIcon, UserIcon];
  // const Icons = user ? [HomeIcon, OrderIcon, UserIcon] : [HomeIcon, UserIcon];

  // // if (!user) {
  // //   state.routes.splice(state.routes.indexOf(OrderIcon));
  // // }

  // let routes = state.routes;
  // if (!user) {
  //   routes = [state.routes[0], state.routes[1], state.routes[3]];
  // }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const IconComponent = Icons[index];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };
        return (
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.key}
          >
            <View style={styles.iconContainer}>
              <View>
                <IconComponent
                  height={48}
                  width={62}
                  color={isFocused ? activeColor : inactiveColor}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  button: {
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomTabBar;
