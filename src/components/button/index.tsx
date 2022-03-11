import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  text?: string;
  onPress?: () => void;
  type?: 'primary' | 'secondary' | 'iconButton' | 'iconSecondary';
  disabled?: boolean;
  height?: number;
  children?: ReactNode;
};
export const Button = (props: Props) => {
  const {text, onPress, type, disabled = false, height = 40, children} = props;
  const styles = disabled
    ? disabledStyle
    : type === 'primary'
    ? primaryStyle
    : type === 'iconButton'
    ? iconBtnStyle
    : type === 'iconSecondary'
    ? iconSecondaryStyle
    : secondaryStyle;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, {height: height}]}
      onPress={onPress}
    >
      {type === 'iconButton' ? children : null}
      {type === 'iconSecondary' ? children : null}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const primaryStyle = StyleSheet.create({
  container: {
    backgroundColor: '#D3A762',
    textAlignVertical: 'center',
    width: '100%',
    borderRadius: 4,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
  },
});

const secondaryStyle = StyleSheet.create({
  container: {
    textAlignVertical: 'center',
    borderRadius: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D3A762',
  },
  text: {
    color: '#D3A762',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
  },
});

const disabledStyle = StyleSheet.create({
  container: {
    textAlignVertical: 'center',
    borderRadius: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C6C6C6',
    borderWidth: 1,
    borderColor: '#C6C6C6',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
  },
});

const iconBtnStyle = StyleSheet.create({
  container: {
    backgroundColor: '#D3A762',
    textAlignVertical: 'center',
    width: '100%',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    paddingLeft: 5,
  },
});
const iconSecondaryStyle = StyleSheet.create({
  container: {
    textAlignVertical: 'center',
    borderRadius: 4,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(45, 42, 43, 0.1)',
  },

  text: {
    color: '#2D2A2B',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    paddingLeft: 5,
  },
});
