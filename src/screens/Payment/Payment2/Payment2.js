/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Payment1/Payment1Style';
import styles2 from './Payment2Style';
import {postTransactions} from '../../../utils/https/transactions';
import PushNotification from 'react-native-push-notification';
import {transactionAction} from '../../../redux/actionCreators/transaction';
import LoadingModal from '../../../components/LoadingModal/LoadingModal';

const Payment2 = props => {
  const {navigation, route} = props;
  const auth = useSelector(reduxState => reduxState.auth.authInfo);
  const transaction = useSelector(state => state.transaction);
  const [loadingModal, setLoadingModal] = useState(false);
  const dispatch = useDispatch();
  console.log(transaction);

  const notificationHandler = (result, resultModel) => {
    PushNotification.localNotification({
      channelId: 'transaction-channel',
      title: 'Finish Your Payment',
      bigText: "Let's finish your payment for " + resultModel,
      message: 'Payment Code : ' + result.payment_code,
      subText: 'Payment Code : ' + result.payment_code,
    });
  };
  const paymentCode = () => {
    const min = Math.ceil(11111111);
    const max = Math.floor(99999999);
    return Math.floor(Math.random() * (max - min) + min);
  };
  const paymentHandler = () => {
    setLoadingModal(true);
    const body = {
      id_card: transaction.idCard,
      user_id: transaction.user_id,
      model_id: transaction.model_id,
      amount_rented: transaction.amount_rented,
      prepayment: transaction.prepayment,
      rent_start_date: transaction.rent_start_date,
      rent_finish_date: transaction.rent_finish_date,
      payment_method: transaction.payment,
      payment_code: paymentCode(),
    };
    postTransactions(body)
      .then(data => {
        dispatch(transactionAction({transactionId: data.data.result}));
        notificationHandler(body, transaction.model);
        setLoadingModal(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Payment3'}],
        });
      })
      .catch(err => {
        console.log(err);
        setLoadingModal(false);
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
        <View style={[styles.progressCircle, styles.inactiveCircle]}>
          <Text style={styles.progressTxt}>3</Text>
        </View>
      </View>
      <ScrollView style={styles2.mainData}>
        <ImageBackground
          source={{uri: transaction.vehicleImage}}
          style={styles2.vehiclePic}
          imageStyle={{borderRadius: 10}}>
          <LinearGradient
            colors={['#F8A170', '#FFCD61']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles2.rating}>
            <Text style={styles2.ratingTxt}>4.5</Text>
            <Ionicons name="star" color="white" />
          </LinearGradient>
        </ImageBackground>
        <Text style={styles2.textGap}>
          {transaction.amount_rented} {transaction.model}
        </Text>
        <Text style={styles2.textGap}>{transaction.duration} day(s)</Text>
        <Text style={styles2.textGap}>
          {transaction.rent_start_date} to {transaction.rent_finish_date}
        </Text>
        <View style={styles2.identity}>
          <Text style={styles2.identityTxt}>ID : {transaction.idCard}</Text>
          <Text style={styles2.identityTxt}>
            {auth.userName} ({auth.email})
          </Text>
          <Text style={styles2.identityTxt}>{auth.phone}</Text>
          <Text style={styles2.identityTxt}>{auth.address}</Text>
        </View>
      </ScrollView>
      <Pressable style={styles.order} onPress={paymentHandler}>
        <Text style={styles.bigTxt}>Get Payment Code</Text>
      </Pressable>
    </View>
  );
};

export default Payment2;
