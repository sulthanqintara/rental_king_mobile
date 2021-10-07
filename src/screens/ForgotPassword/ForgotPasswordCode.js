import React, {useState} from 'react';
import styles from './ForgotPasswordStyle';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import Icon from 'react-native-vector-icons/Ionicons';
import imageBackground from '../../assets/img/forgot.jpg';
import {
  checkForgotPasswordCode,
  postForgotPasswordCode,
} from '../../utils/https/user';

const ForgotPasswordCode = props => {
  const params = props.route.params;
  const {control, handleSubmit} = useForm({mode: 'onBlur'});
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmit = data => {
    if (data.code.length < 6) {
      return setErrorMessage('Code must be 6 numbers');
    }
    const body = {email: params.email, code: Number(data.code)};
    setErrorMessage(false);
    checkForgotPasswordCode(body)
      .then(() => {
        props.navigation.navigate('NewPassword', {
          email: params.email,
          code: data.code,
        });
      })
      .catch(err => {
        console.log(err);
        const errString = String(err);
        if (errString.includes('404')) {
          setErrorMessage('Code is invalid');
        }
      });
  };
  const onResend = () => {
    const body = {email: params.email};
    postForgotPasswordCode(body).then(() =>
      ToastAndroid.show('Code resent!', ToastAndroid.SHORT),
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={imageBackground}
        resizeMode="cover">
        <ScrollView style={styles.darken}>
          <View style={styles.back}>
            <Icon
              name="chevron-back-outline"
              size={40}
              color="#fff"
              onPress={() => props.navigation.goBack()}
            />
            <Text style={styles.whiteText}> Back</Text>
          </View>
          <Text style={styles.title}>THAT'S OKAY, WE GOT YOUR BACK</Text>
          <Text style={styles.whiteText}>
            We've sent you an e-mail for code!
          </Text>
          <Text style={styles.whiteText}>
            Check your email for code to reset your password.
          </Text>
          <Controller
            control={control}
            name="code"
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your code"
                placeholderTextColor="white"
                keyboardType="number-pad"
                maxLength={6}
              />
            )}
          />
          <Pressable
            style={[styles.button, styles.yellowButton]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Check Code</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit(onResend)}>
            <Text style={styles.buttonText}>Resend Code</Text>
          </Pressable>
          {errorMessage ? (
            <Text style={styles.warning}>{errorMessage}</Text>
          ) : (
            <Text>{}</Text>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ForgotPasswordCode;
