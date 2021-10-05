import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import imageBackground from '../../assets/img/register.jpg';
import googleIcon from '../../assets/img/google.png';
import styles from './SignUpStyle';
import {postRegister} from '../../utils/https/auth';
import {useState} from 'react';

const SignUp = props => {
  const [errorMessage, setErrorMessage] = useState(false);
  const {control, handleSubmit} = useForm({mode: 'onBlur'});

  const onSubmit = data => {
    if (!data.email || !data.password || !data.phone_number) {
      return setErrorMessage(
        'Username, Phone Number, and Password are required',
      );
    }
    if (!data.email.includes('@')) {
      return setErrorMessage('Please input a Valid Email');
    }
    if (data.password.length < 6) {
      return setErrorMessage('Password must have 6 or more characters');
    }
    const send = {
      email: data.email,
      password: data.password,
      phone_number: data.phone_number,
      auth_level: 3,
    };
    postRegister(send).then(() => {
      ToastAndroid.show("Signed Up, Let's Login!", ToastAndroid.SHORT);
      props.navigation.navigate('Login');
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={imageBackground}
        resizeMode="cover">
        <ScrollView style={styles.darken}>
          <Text style={styles.title}>LET’S HAVE{'\n'}SOME RIDE</Text>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                autoCompleteType="email"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                placeholderTextColor="white"
              />
            )}
          />
          <Controller
            name="phone_number"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                autoCompleteType="tel"
                keyboardType="number-pad"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Phone Number"
                placeholderTextColor="white"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                autoCompleteType="password"
                secureTextEntry={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                placeholderTextColor="white"
              />
            )}
          />
          <Pressable
            style={[styles.button, styles.yellowButton]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Image source={googleIcon} style={styles.googleIcon} />
            <Text style={styles.buttonText}>Sign up with Google</Text>
          </Pressable>
          {errorMessage && <Text style={styles.warning}>{errorMessage}</Text>}
          <View style={styles.signUp}>
            <Text style={styles.whiteText}>Already have an account? </Text>
            <Pressable onPress={() => props.navigation.navigate('Login')}>
              <Text style={[styles.whiteText, styles.underline]}>
                Login now
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignUp;
