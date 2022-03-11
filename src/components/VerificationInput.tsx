import React from 'react';
import {StyleSheet, View, TextInput, Text, Pressable} from 'react-native';

interface VerificationInputType {
  onChange: (text: string) => void;
  input: string;
}

const VerificationInput = React.forwardRef(
  (
    {onChange, input}: VerificationInputType,
    ref: React.ForwardedRef<unknown>,
  ) => {
    const activeIndex = input.length;
    const pass = ['a', 'a', 'a', 'a', 'a', 'a'];
    return (
      <View>
        <TextInput
          keyboardType="number-pad"
          value={input}
          autoFocus
          maxLength={6}
          onChangeText={text => {
            const length = text.length;
            if (text[length - 1] !== ' ') {
              onChange(text);
            }
          }}
          style={styles.hideInput}
          ref={ref}
        />
        <View style={styles.inputContainer}>
          {pass.map((a, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  ref.current?.focus();
                }}
                style={[styles.input]}
              >
                <Text style={[styles.inputText]}>{input[index]}</Text>
                <View
                  style={[
                    activeIndex > index ? styles.hideInput : styles.bottomLine,
                    activeIndex == index ? styles.focusInput : '',
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

export default VerificationInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  input: {
    width: '15%',
    height: 46,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  inputText: {
    fontSize: 24,
  },

  hideInput: {
    height: 0,
    width: 0,
  },

  bottomLine: {
    width: '30%',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    height: 1,
    bottom: '-20%',
  },

  focusInput: {
    backgroundColor: '#000000',
  },
});

// function input(onChange: any, input: any, ref: any) {
//   throw new Error('Function not implemented.');
// }
