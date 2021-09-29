import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal} from 'react-native';

const ModalComponent = ({
  setModalVisible,
  modalVisible,
  buttonStyle,
  nextHandler,
  buttonText,
  leftButtonText,
  rightButtonText,
  titleText,
  leftButtonColor,
  rightButtonColor,
}) => {
  //   const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{titleText}</Text>
            <View style={styles.flexRow}>
              <Pressable
                style={[
                  styles.button,
                  {backgroundColor: leftButtonColor || '#2196F3'},
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  nextHandler();
                }}>
                <Text style={styles.textStyle}>
                  {leftButtonText || 'Left Button'}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {backgroundColor: rightButtonColor || '#2196F3'},
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>
                  {rightButtonText || 'Right Button'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={buttonStyle}>
        <Text style={styles.logoutBtnTxt}>{buttonText || 'Button'}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.56)',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flexRow: {flexDirection: 'row'},
  logoutBtnTxt: {fontSize: 20, fontWeight: '700'},
});

export default ModalComponent;
