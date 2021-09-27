import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import styles from './LoginStyle';

import imageBackground from '../../assets/img/Login.jpg';
import googleIcon from '../../assets/img/google.png';
import {loginAction} from '../../redux/actionCreators/auth';

const Login = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => {
    const form = new URLSearchParams();
    form.append('email', data.email);
    form.append('password', data.password);
    props.onLogin(form);
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (props.auth.isLogin) {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.isLogin]);

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

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogin: body => {
      dispatch(loginAction(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
