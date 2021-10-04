/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, Pressable, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Payment1/Payment1Style';
import styles2 from './Payment2Style';
import {postTransactions} from '../../utils/https/transactions';
import PushNotification from 'react-native-push-notification';

const Payment2 = props => {
  const {navigation, route} = props;
  const auth = useSelector(reduxState => reduxState.auth.authInfo);
  const passedData = route.params;

  const notificationHandler = (result, resultModel) => {
    PushNotification.localNotification({
      channelId: 'transaction-channel',
      title: 'Finish Your Payment',
      bigText: "Let's finish your payment for " + resultModel,
      message: 'Payment Code : ' + result.payment_code,
      subText: 'Payment Code : ' + result.payment_code,
    });
  };

  const paymentCode = (min, max) => {
    min = Math.ceil(11111111);
    max = Math.floor(99999999);
    return Math.floor(Math.random() * (max - min) + min);
  };
  const paymentHandler = () => {
    const body = {
      id_card: passedData.idCard,
      user_id: passedData.user_id,
      model_id: passedData.model_id,
      amount_rented: passedData.amount_rented,
      prepayment: passedData.prepayment,
      rent_start_date: passedData.rent_start_date,
      rent_finish_date: passedData.rent_finish_date,
      payment_method: passedData.payment,
      payment_code: paymentCode(),
    };

    postTransactions(body)
      .then(data => {
        notificationHandler(body, passedData.model);
        navigation.navigate('Payment3', {
          transactionId: data.data.result,
          duration: passedData.duration,
          passedData,
        });
      })
      .catch(err => console.log(err));
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
        <View style={[styles.progressCircle, styles.inactiveCircle]}>
          <Text style={styles.progressTxt}>3</Text>
        </View>
      </View>
      <ScrollView style={styles2.mainData}>
        <ImageBackground
          source={{uri: route.params.vehicleImage}}
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
          {passedData.amount_rented} {passedData.model}
        </Text>
        <Text style={styles2.textGap}>{passedData.duration} day(s)</Text>
        <Text style={styles2.textGap}>
          {passedData.rent_start_date} to {passedData.rent_finish_date}
        </Text>
        <View style={styles2.identity}>
          <Text style={styles2.identityTxt}>ID : {passedData.idCard}</Text>
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
