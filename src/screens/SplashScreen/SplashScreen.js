import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './SplashScreenStyle';

const SplashScreen = ({navigation}) => {
  const auth = useSelector(reduxState => reduxState.auth);

  useEffect(() => {
    auth.token !== ''
      ? setTimeout(() => {
          navigation.replace('Home');
        }, 500)
      : setTimeout(() => {
          navigation.replace('Login');
        }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <Ionicons name="car-sport-sharp" size={50} />
      <Text style={styles.title}>RKM</Text>
    </View>
  );
};

export default SplashScreen;
