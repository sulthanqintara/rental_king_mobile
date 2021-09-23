import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text, ImageBackground, Pressable, TextInput} from 'react-native';

import styles from './ForgotPasswordStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import imageBackground from '../../assets/img/forgot.jpg';

const ForgotPassword = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => {
    console.log(data);
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={imageBackground}
        resizeMode="cover">
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
          rules={{
            required: true,
          }}
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
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Resend Code</Text>
        </Pressable>
        {errors.email ? (
          <Text style={styles.warning}>Please insert your email!</Text>
        ) : (
          <Text>{}</Text>
        )}
      </ImageBackground>
    </View>
  );
};

export default ForgotPassword;
