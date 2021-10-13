import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import socket from '../../components/Socket/SocketIo';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './SplashScreenStyle';
import {getPatchToken} from '../../utils/https/auth';
// import socket from '../../components/Socket/SocketIo';

const SplashScreen = ({navigation}) => {
  const auth = useSelector(reduxState => reduxState.auth);

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'transaction-channel',
      channelName: 'Transaction',
    });
    PushNotification.createChannel({
      channelId: 'chat-channel',
      channelName: 'Chat',
    });
  };

  useEffect(
    () => {
      createChannel();
      auth.token !== ''
        ? setTimeout(() => {
            getPatchToken(auth.token)
              .then(() => {
                socket.on('connect');
                socket.on(auth.authInfo.user_id, data => {
                  PushNotification.localNotification({
                    channelId: 'chat-channel',
                    title: 'Chat from ' + data.senderName,
                    message: data.message,
                  });
                });
                socket.on(`transaction_${auth.authInfo.user_id}`, data => {
                  PushNotification.localNotification({
                    channelId: 'transaction-channel',
                    title: data.title,
                    message: data.message,
                  });
                });
                navigation.replace('Home');
              })
              .catch(err => {
                console.log(err);
                socket.off(auth.authInfo.user_id);
                socket.off(`transaction_${auth.authInfo.user_id}`);
                navigation.replace('Login');
              });
          }, 500)
        : setTimeout(() => {
            socket.off(`transaction_${auth.authInfo.user_id}`);
            socket.off(auth.authInfo.user_id);
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
