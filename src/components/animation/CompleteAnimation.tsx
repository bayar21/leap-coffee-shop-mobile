import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {Modal, StyleSheet, Pressable, View} from 'react-native';

const CompleteAnimation = ({onFinished}: {onFinished: () => void}) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent visible={modalVisible}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            setModalVisible(!modalVisible);
            onFinished();
          }}
        >
          <View style={styles.modalView}>
            <LottieView
              source={require('./purchase.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#F194FF',
  },
  lottie: {
    width: 150,
    height: 150,
  },
});

export default CompleteAnimation;
