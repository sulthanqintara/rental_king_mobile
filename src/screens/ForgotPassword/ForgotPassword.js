import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';

import styles from './ForgotPasswordStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import imageBackground from '../../assets/img/forgot.jpg';
import {postForgotPasswordCode} from '../../utils/https/user';

const ForgotPassword = props => {
  const {control, handleSubmit} = useForm({mode: 'onBlur'});

  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmit = data => {
    if (data.email === '') {
      return setErrorMessage('Please insert your email');
    }
    if (!data.email.includes('@')) {
      return setErrorMessage('Please input a valid email');
    }
    setErrorMessage(false);
    const body = {email: data.email};
    return postForgotPasswordCode(body)
      .then(() => {
        setErrorMessage(false);
        return props.navigation.navigate('ForgotCode', {email: data.email});
      })
      .catch(err => {
        const errString = String(err);
        if (errString.includes('404')) {
          setErrorMessage('Email not found!');
        }
      });
  };
  const onAlreadySent = data => {
    if (data.email === '') {
      return setErrorMessage('Please insert your email');
    }
    if (!data.email.includes('@')) {
      return setErrorMessage('Please input a valid email');
    }
    setErrorMessage(false);
    return props.navigation.navigate('ForgotCode', {email: data.email});
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
            Enter your email to get reset password code
          </Text>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                autoCompleteType="email"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your email adress"
                placeholderTextColor="white"
              />
            )}
          />
          <Pressable
            style={[styles.button, styles.yellowButton]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Send Code</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleSubmit(onAlreadySent)}>
            <Text style={styles.buttonText}>I already have the code</Text>
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

export default ForgotPassword;
