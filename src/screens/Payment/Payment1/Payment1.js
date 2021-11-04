import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ToastAndroid,
  Modal,
  TouchableOpacity,
} from 'react-native';
import styles from './Payment1Style';
// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {profileAction} from '../../../redux/actionCreators/auth';
import {transactionAction} from '../../../redux/actionCreators/transaction';

const Payment1 = props => {
  const {navigation, route} = props;
  const auth = useSelector(reduxState => reduxState.auth.authInfo);
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transaction);
  const [modalOpen, setModalOpen] = useState(auth.address);
  const [address, setAddress] = useState(auth.address);
  const [idCard, setIdCard] = useState(null);
  const [payment, setPayment] = useState(0);
  const [firstName, setFirstName] = useState(
    auth?.userName ? auth.userName.split(' ')[0] : '',
  );
  const [lastName, setlastName] = useState(
    auth?.userName ? auth.userName.split(' ')[1] : '',
  );

  const placeholder = {
    label: 'Payment Type',
    value: null,
    color: '#9EA0A4',
  };
  const buttonHandler = () => {
    if (!idCard) {
      return ToastAndroid.show(
        'Please input id card number',
        ToastAndroid.SHORT,
      );
    }
    if (!firstName) {
      return ToastAndroid.show('Please input first name', ToastAndroid.SHORT);
    }
    if (!address) {
      return ToastAndroid.show('Please input location!', ToastAndroid.SHORT);
    }
    if (!payment) {
      return ToastAndroid.show(
        'Please select payment methods',
        ToastAndroid.SHORT,
      );
    }
    const form = new FormData();
    !auth?.userName &&
      firstName &&
      form.append('name', `${firstName} ${lastName}`);
    !auth.address && address && form.append('address', address);
    form['_parts'].length > 0 && dispatch(profileAction(form, auth.user_id));
    dispatch(transactionAction({idCard, payment}));
    navigation.navigate('Payment2');
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={[styles.flexRow, styles.header]}>
        <Ionicons name="chevron-back-outline" size={28} />
        <Text style={[styles.bigTxt, styles.headerTitle]}>Payment</Text>
      </Pressable>
      <View style={[styles.progress, styles.flexRow]}>
        <LinearGradient
          style={styles.progressCircle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F8A170', '#FFCD61']}>
          <Text style={styles.progressTxt}>1</Text>
        </LinearGradient>
        <View style={[styles.progressCircle, styles.inactiveCircle]}>
          <Text style={styles.progressTxt}>2</Text>
        </View>
        <View style={[styles.progressCircle, styles.inactiveCircle]}>
          <Text style={styles.progressTxt}>3</Text>
        </View>
      </View>
      <TextInput
        placeholder="ID card number"
        style={styles.txtInput}
        keyboardType="numeric"
        onEndEditing={e => setIdCard(e.nativeEvent.text)}
      />
      <TextInput
        placeholder="First Name"
        defaultValue={auth?.userName ? auth.userName.split(' ')[0] : ''}
        style={styles.txtInput}
        onChange={e => setFirstName(e.nativeEvent.text)}
      />
      <TextInput
        placeholder="Last Name"
        defaultValue={auth?.userName ? auth.userName.split(' ')[1] : ''}
        style={styles.txtInput}
      />
      <TextInput
        placeholder="Mobile Phone (must be active)"
        style={styles.txtInput}
        defaultValue={auth.phone}
      />
      <TextInput
        placeholder="Email address"
        defaultValue={auth.email}
        style={styles.txtInput}
      />
      <TextInput
        placeholder="Location"
        defaultValue={auth.address}
        style={styles.txtInput}
        onChange={e => {
          setAddress(e.nativeEvent.text);
        }}
      />
      <Pressable
        style={styles.inputAndroid}
        onPress={() => {
          setModalOpen(true);
        }}>
        <Text style={styles.modalDurationText}>
          {payment === 0 && 'Select Payment Method'}
          {payment === 1 && 'Transfer'}
          {payment === 2 && 'Cash'}
        </Text>
        <Ionicons name="chevron-down" size={16} />
      </Pressable>
      <Modal
        animationType="fade"
        visible={modalOpen}
        transparent={true}
        onRequestClose={() => {
          setModalOpen(!modalOpen);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.durationModal}>
            <View style={styles.modalDurationRow}>
              <Text style={[styles.modalDurationText, styles.disabled]}>
                Select Transfer Method :
              </Text>
            </View>
            <TouchableOpacity
              style={styles.modalDurationRow}
              onPress={() => {
                setModalOpen(false);
                setPayment(1);
              }}>
              <Text style={styles.modalDurationText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalDurationRow}
              onPress={() => {
                setModalOpen(false);
                setPayment(2);
              }}>
              <Text style={styles.modalDurationText}>Cash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.order} onPress={buttonHandler}>
        <Text style={styles.bigTxt}>See Order Details</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Payment1;
