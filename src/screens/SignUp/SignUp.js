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

const SignUp = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => {
    postRegister(data).then(() => {
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
        <ScrollView>
          <Text style={styles.title}>LET’S HAVE{'\n'}SOME RIDE</Text>
          <Controller
            name="email"
            control={control}
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
                placeholder="Email"
                placeholderTextColor="white"
              />
            )}
          />
          <Controller
            name="phone_number"
            control={control}
            rules={{
              required: true,
            }}
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
            rules={{
              required: true,
            }}
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
          {errors.username || errors.password || errors.phone_number ? (
            <Text style={styles.warning}>
              Username, Phone Number, and Password are required!
            </Text>
          ) : (
            <Text>{}</Text>
          )}
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
