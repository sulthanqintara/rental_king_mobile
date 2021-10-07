import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import PushNotification from 'react-native-push-notification';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './SplashScreenStyle';
import {getPatchToken} from '../../utils/https/auth';

const SplashScreen = ({navigation}) => {
  const auth = useSelector(reduxState => reduxState.auth);

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'transaction-channel',
      channelName: 'Transaction',
    });
  };

  useEffect(
    () => {
      createChannel();
      auth.token !== ''
        ? setTimeout(() => {
            getPatchToken(auth.token)
              .then(() => {
                navigation.replace('Home');
              })
              .catch(err => {
                console.log(err);
                navigation.replace('Login');
              });
          }, 500)
        : setTimeout(() => {
            navigation.replace('Login');
          }, 500);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <View style={styles.container}>
      <Ionicons name="car-sport-sharp" size={50} />
      <Text style={styles.title}>RKM</Text>
    </View>
  );
};

export default SplashScreen;
