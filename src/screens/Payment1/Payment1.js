import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput, Pressable} from 'react-native';
import styles from './Payment1Style';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const Payment1 = props => {
  const {navigation, route} = props;
  let bodyData = {...route.params};

  const [idCard, setIdCard] = useState(null);
  const [payment, setPayment] = useState(null);

  const auth = useSelector(reduxState => reduxState.auth.authInfo);
  const placeholder = {
    label: 'Payment Type',
    value: null,
    color: '#9EA0A4',
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
        value={auth.userName.split(' ')[0]}
        style={styles.txtInput}
      />
      <TextInput
        placeholder="Last Name"
        value={auth.userName.split(' ')[1]}
        style={styles.txtInput}
      />
      <TextInput
        placeholder="Mobile Phone (must be active)"
        style={styles.txtInput}
        value={auth.phone}
      />
      <TextInput
        placeholder="Email address"
        value={auth.email}
        style={styles.txtInput}
      />
      <TextInput
        placeholder="Location"
        value={auth.address}
        style={styles.txtInput}
      />
      <RNPickerSelect
        placeholder={placeholder}
        onValueChange={value => setPayment(value)}
        useNativeAndroidPickerStyle={false}
        style={styles}
        value={payment}
        items={[
          {label: 'Transfer', value: 1, color: 'black'},
          {label: 'Cash', value: 2, color: 'black'},
        ]}
        Icon={() => {
          return (
            <Ionicons
              name="caret-down"
              size={20}
              color="gray"
              style={styles.dropdownIcon}
            />
          );
        }}
      />
      <Pressable
        style={styles.order}
        onPress={() => {
          navigation.navigate('Payment2', {...bodyData, idCard, payment});
        }}>
        <Text style={styles.bigTxt}>See Order Details</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Payment1;
