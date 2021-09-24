import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {getData} from '../../utils/asyncStorage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    getData('token').then(data =>
      data !== ''
        ? setTimeout(() => {
            navigation.replace('Home');
          }, 1000)
        : setTimeout(() => {
            navigation.replace('Login');
          }, 1000),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <Text>INI SPLASH SCREN</Text>
    </View>
  );
};

export default SplashScreen;
