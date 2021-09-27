/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, ScrollView, ToastAndroid} from 'react-native';
import {
  getTransactionByID,
  patchTransaction,
} from '../../utils/https/transactions';
import {getVehicles} from '../../utils/https/vehicles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Payment1/Payment1Style';
import styles3 from './Payment3Style';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';

const Payment3 = props => {
  const {navigation, route} = props;
  const [paymentCode, setPaymentCode] = useState(null);
  const [bookCode, setBookCode] = useState(null);
  const [amount, setAmount] = useState(null);
  const [model, setModel] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  const [payBefore, setPayBefore] = useState('');
  const [prepayment, setPrepayment] = useState(null);

  const duration = route.params.duration;
  const passedData = route.params.passedData;

  useEffect(() => {
    getTransactionByID(route.params.transactionId).then(({data}) => {
      const result = data.result;
      const currentDate = new Date(result.time_posted);
      setPaymentCode(result.payment_code);
      setPayBefore(new Date(currentDate.setDate(currentDate.getDate() + 1)));
      setBookCode(result.booking_code);
      setAmount(result.amount_rented);
      setStartDate(new Date(result.rent_start_date).toDateString());
      setFinishDate(new Date(result.rent_finish_date).toDateString());
      setPrepayment(result.prepayment);
      getVehicles({id: result.model_d})
        .then(vehicleData => {
          setModel(vehicleData.data.result[0].model);
        })
        .catch(err => console.log(err));
    });
  }, []);

  const copyToClipboard = () => {
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
    Clipboard.setString(
      `Payment Code : ${paymentCode}\nBooking Code : ${bookCode} `,
    );
  };

  const finishPaymentHandler = () => {
    const body = {id: route.params.transactionId, user_paid_status: 1};
    patchTransaction(body);
    props.navigation.navigate('FinishedPayment', {passedData});
  };

  return (
    <View style={styles.container}>
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
        <LinearGradient
          style={styles.progressCircle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F8A170', '#FFCD61']}>
          <Text style={styles.progressTxt}>2</Text>
        </LinearGradient>
        <LinearGradient
          style={styles.progressCircle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F8A170', '#FFCD61']}>
          <Text style={styles.progressTxt}>3</Text>
        </LinearGradient>
      </View>
      <ScrollView>
        <Text style={[styles3.paymentCodeTitle, styles3.center]}>
          Payment Code :
        </Text>
        <Text style={[styles3.paymentCode, styles3.center]}>{paymentCode}</Text>
        <Text style={[styles3.smallTxt, styles3.center]}>
          Insert your payment code while you transfer booking order
        </Text>
        <Text style={[styles3.smallTxt, styles3.center]}>Pay Before :</Text>
        <Text style={[styles3.center, styles3.timer]}>
          {typeof payBefore !== 'string' && payBefore.toLocaleDateString()}{' '}
          {typeof payBefore !== 'string' && payBefore.toLocaleTimeString()}
        </Text>
        <Text style={styles3.normalTxt}>Bank account information :</Text>
        <Text style={[styles.bigTxt, styles3.center]}>0290-90203-345-2</Text>
        <Text style={[styles3.normalTxt, styles3.owner]}>
          Vespa rental Jogja
        </Text>
        <View style={styles3.bookContainer}>
          <Text style={styles3.normalTxt}>Booking Code : </Text>
          <Text style={styles3.bookCode}>{bookCode}</Text>
        </View>
        <Text style={[styles3.smallTxt, styles3.center]}>
          Use booking code to pick up your vespa
        </Text>
        <View style={styles3.copyBtnContainer}>
          <Pressable style={styles3.copyBtn} onPress={copyToClipboard}>
            <Text style={styles3.smallTxt}>
              {'Copy Payment & Booking Code'}
            </Text>
          </Pressable>
        </View>
        <Text>Order details :</Text>
        <Text>
          {amount} {model}
        </Text>
        <Text>{duration} day(s)</Text>
        <Text>
          {startDate} to {finishDate}
        </Text>
      </ScrollView>
      <View style={styles3.priceContainer}>
        <Text style={styles3.prepayment}>Rp. {prepayment}</Text>
        <Ionicons
          name="information-circle"
          color="#CECECE"
          size={37}
          style={styles3.infoIcon}
        />
      </View>
      <Pressable style={styles.order} onPress={finishPaymentHandler}>
        <Text style={styles.bigTxt}>Finish Payment</Text>
      </Pressable>
    </View>
  );
};

export default Payment3;
