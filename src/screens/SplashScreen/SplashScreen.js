import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const auth = useSelector(reduxState => reduxState.auth);

  useEffect(() => {
    console.log(auth.token);
    auth.token !== ''
      ? setTimeout(() => {
          navigation.replace('Home');
        }, 1000)
      : setTimeout(() => {
          navigation.replace('Login');
        }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <Text>INI SPLASH SCREN</Text>
    </View>
  );
};

export default SplashScreen;
