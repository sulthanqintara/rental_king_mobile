import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import styles from './LoginStyle';
import {useForm, Controller} from 'react-hook-form';

import imageBackground from '../../assets/img/Login.jpg';
import googleIcon from '../../assets/img/google.png';

const Login = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => {
    console.log(data);
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={imageBackground}
        resizeMode="cover">
        <Text style={styles.title}>LET’S EXPLORE{'\n'}THE WORLD</Text>
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
              placeholder="E-mail"
              placeholderTextColor="white"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
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
        <Pressable onPress={() => props.navigation.navigate('Forgot')}>
          <Text style={[styles.whiteText, styles.underline]}>
            Forgot Password?
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.yellowButton]}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Image source={googleIcon} style={styles.googleIcon} />
          <Text style={styles.buttonText}>Login with Google</Text>
        </Pressable>
        {errors.username || errors.password ? (
          <Text style={styles.warning}>
            Username and Password are required!
          </Text>
        ) : (
          <Text>{}</Text>
        )}
        <View style={styles.signUp}>
          <Text style={styles.whiteText}>Don't have account? </Text>
          <Pressable onPress={() => props.navigation.navigate('Register')}>
            <Text style={[styles.whiteText, styles.underline]}>
              Sign up now
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
