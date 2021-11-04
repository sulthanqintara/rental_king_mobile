/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  ScrollView,
  BackHandler,
} from 'react-native';
import styles from './FinishedPaymentStyle';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const FinishedPayment = ({route, navigation}) => {
  const auth = useSelector(reduxState => reduxState.auth.authInfo);
  const transaction = useSelector(state => state.transaction);

  const passedData = route.params?.passedData
    ? route.params?.passedData
    : transaction;

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

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }}
        style={[styles.flexRow, styles.header]}>
        <Ionicons name="chevron-back-outline" size={28} />
        <Text style={[styles.bigTxt, styles.headerTitle]}>Back to Home</Text>
      </Pressable>
      <ScrollView>
        <Text style={styles.success}>Payment Success!</Text>
        <ImageBackground
          source={{uri: passedData.vehicleImage}}
          style={styles.vehiclePic}
          imageStyle={{borderRadius: 10}}>
          <LinearGradient
            colors={['#F8A170', '#FFCD61']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.rating}>
            <Text style={styles.ratingTxt}>4.5</Text>
            <Ionicons name="star" color="white" />
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.textGap}>
          {passedData.amount_rented} {passedData.model}
        </Text>
        <Text style={styles.textGap}>{passedData.duration} day(s)</Text>
        <Text style={styles.textGap}>
          {passedData.rent_start_date} to {passedData.rent_finish_date}
        </Text>
        <View style={styles.identity}>
          <Text style={styles.identityTxt}>ID : {passedData.idCard}</Text>
          <Text style={styles.identityTxt}>
            {auth.userName} ({auth.email})
          </Text>
          <View style={styles.flexRow}>
            <Text style={styles.identityTxt}>{auth.phone} </Text>
            <Text>(</Text>
            <Text style={styles.greenTxt}>active</Text>
            <Text>)</Text>
          </View>
          <Text style={styles.identityTxt}>{auth.address}</Text>
        </View>
      </ScrollView>
      <Pressable style={styles.order}>
        <Text style={styles.bigTxt}>Total : Rp. {passedData.prepayment}</Text>
      </Pressable>
    </View>
  );
};

export default FinishedPayment;
