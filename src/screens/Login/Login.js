import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import styles from './LoginStyle';
import socket from '../../components/Socket/SocketIo';

import imageBackground from '../../assets/img/Login.jpg';
import googleIcon from '../../assets/img/google.png';
import {loginAction} from '../../redux/actionCreators/auth';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';

const Login = props => {
  const auth = useSelector(reduxState => reduxState.auth);
  const [errorMessage, setErrorMessage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {control, handleSubmit} = useForm({mode: 'onBlur'});
  const onSubmit = data => {
    setErrorMessage(false);
    setModalVisible(true);
    if (!data.email || !data.password) {
      setModalVisible(false);
      return setErrorMessage('Username and Password are Required');
    }
    if (!data.email.includes('@')) {
      setModalVisible(false);
      return setErrorMessage('Please input a Valid Email');
    }
    if (data.password.length < 6) {
      setModalVisible(false);
      return setErrorMessage('Password must have 6 or more characters');
    }
    const form = new URLSearchParams();
    form.append('email', data.email);
    form.append('password', data.password);
    props.onLogin(form);
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    const errorLogin = String(props.auth.error);
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (props.auth.isLogin) {
        socket.on('connect');
        socket.on(auth.authInfo.user_id, data => {
          PushNotification.localNotification({
            channelId: 'chat-channel',
            title: 'Chat from ' + data.senderName,
            message: data.message,
          });
        });
        socket.on(`transaction_${auth.authInfo.user_id}`, data => {
          PushNotification.localNotification({
            channelId: 'transaction-channel',
            title: data.title,
            message: data.message,
          });
        });
        setModalVisible(false);
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
      if (errorLogin.includes('401') === true) {
        setModalVisible(false);
        return setErrorMessage('Username and/or Password Are Incorrect');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.isLogin, props.auth.error]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      </Modal>
      <ImageBackground
        style={styles.imageBackground}
        source={imageBackground}
        resizeMode="cover">
        <ScrollView style={styles.darken}>
          <Text style={styles.title}>LET’S EXPLORE{'\n'}THE WORLD</Text>
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
                placeholder="E-mail"
                placeholderTextColor="white"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
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
          {errorMessage && <Text style={styles.warning}>{errorMessage}</Text>}
          <View style={styles.signUp}>
            <Text style={styles.whiteText}>Don't have account? </Text>
            <Pressable onPress={() => props.navigation.navigate('Register')}>
              <Text style={[styles.whiteText, styles.underline]}>
                Sign up now
              </Text>
            </Pressable>
          </View>
        </ScrollView>
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
