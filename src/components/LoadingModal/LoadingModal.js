import React from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingModal = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color="#FFCD61" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    justifyContent: 'center',
  },
});

export default LoadingModal;
