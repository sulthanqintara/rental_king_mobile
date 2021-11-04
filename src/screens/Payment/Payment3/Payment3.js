/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {
  getTransactionByID,
  patchTransaction,
} from '../../../utils/https/transactions';
import {getVehicles} from '../../../utils/https/vehicles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Payment1/Payment1Style';
import styles3 from './Payment3Style';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSelector} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';

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
  const [loadingModal, setLoadingModal] = useState(true);
  const auth = useSelector(state => state.auth.authInfo);
  const transaction = useSelector(state => state.transaction);
  console.log(transaction);

  const confirmNotification = (result, resultModel) => {
    PushNotification.localNotification({
      channelId: 'transaction-channel',
      title: 'Payment has been Confirmed',
      message: 'Your payment for ' + model + ' Has been confirmed!',
      id: route?.params?.transactionId || transaction?.id,
    });
  };
  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const transactionIdParams = route?.params?.transactionId
    ? route?.params?.transactionId
    : transaction?.transactionId;

  useEffect(() => {
    getTransactionByID(transactionIdParams).then(({data}) => {
      const result = data.result;
      const currentDate = new Date(result.time_posted);
      setPaymentCode(result.payment_code);
      setPayBefore(new Date(currentDate.setDate(currentDate.getDate() + 1)));
      setBookCode(result.booking_code);
      setAmount(result.amount_rented);
      setStartDate(new Date(result.rent_start_date).toDateString());
      setFinishDate(new Date(result.rent_finish_date).toDateString());
      setPrepayment(result.prepayment);
      getVehicles({id: result.model_id})
        .then(vehicleData => {
          setLoadingModal(false);
          const resultModel = vehicleData.data.result.data[0].model;
          setModel(resultModel);
        })
        .catch(err => {
          setLoadingModal(false);
          console.log(err);
        });
    });
  }, []);

  const copyToClipboard = () => {
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
    Clipboard.setString(
      `Payment Code : ${paymentCode}\nBooking Code : ${bookCode} `,
    );
  };

  const finishPaymentHandler = () => {
    setLoadingModal(true);
    const body =
      auth.authLevel === 3
        ? {
            id: transactionIdParams,
            user_paid_status: 1,
          }
        : {
            id: transactionIdParams,
            seller_paid_status: 1,
          };
    patchTransaction(body)
      .then(() => {
        confirmNotification();
        setLoadingModal(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'FinishedPayment'}],
        });
      })
      .catch(error => {
        setLoadingModal(false);
        console.log(error.response);
        ToastAndroid.show('Payment Failed.', ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <LoadingModal
        modalVisible={loadingModal}
        setModalVisible={() => {
          setLoadingModal;
        }}
      />
      <Pressable
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
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
          {transaction.model}
        </Text>
        <View style={styles3.bookContainer}>
          <Text style={styles3.normalTxt}>Booking Code : </Text>
          <Text style={styles3.bookCode}>{bookCode}</Text>
        </View>
        <Text style={[styles3.smallTxt, styles3.center]}>
          Use booking code to pick up your {transaction.model}
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
        <Text>{transaction.duration} day(s)</Text>
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
        {auth.authLevel === 3 ? (
          <Text style={styles.bigTxt}>Finish Payment</Text>
        ) : (
          <Text style={styles.bigTxt}>Confirm Payment</Text>
        )}
      </Pressable>
    </View>
  );
};

export default Payment3;
