import React, {useState} from 'react';
import styles from './ForgotPasswordStyle';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import Icon from 'react-native-vector-icons/Ionicons';
import imageBackground from '../../assets/img/forgot.jpg';
import CustomModal from '../../components/Modals/Modal';
import {patchForgotPassword} from '../../utils/https/user';

const ForgotPasswordCode = props => {
  const params = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});
  const [errorMessage, setErrorMessage] = useState(false);

  const nextHandler = data => {
    if (data.password !== data.confirmPassword) {
      return setErrorMessage("Password Didn't Match");
    }
    setErrorMessage(false);
    const body = {
      email: params.email,
      code: params.code,
      password: data.password,
    };
    patchForgotPassword(body)
      .then(() => {
        ToastAndroid.show('Password Changed!', ToastAndroid.SHORT);
        return props.navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      })
      .catch(err => console.log(err));
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
          <Text style={styles.titleAlt}>THAT'S OKAY, WE GOT YOUR BACK</Text>
          <Text style={styles.whiteText}>Please input your new Password :</Text>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              minLength: 6,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  secureTextEntry={true}
                  importantForAutofill="no"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Your New Password"
                  placeholderTextColor="white"
                />
              </>
            )}
          />
          {errors.password ? (
            <Text style={styles.warning}>Min. 6 characters</Text>
          ) : (
            <Text>{}</Text>
          )}
          <Text style={styles.whiteText}>
            Please confirm your new Password :
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            defaultValue=""
            rules={{
              minLength: 6,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                importantForAutofill="no"
                secureTextEntry={true}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm New Password"
                placeholderTextColor="white"
              />
            )}
          />
          {errors.confirmPassword ? (
            <Text style={styles.warning}>Min. 6 characters</Text>
          ) : (
            <Text>{}</Text>
          )}
          {errors.password || errors.confirmPassword ? (
            <Text>{}</Text>
          ) : (
            <CustomModal
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
              buttonStyle={styles.button}
              buttonText="Change password"
              titleText="Are you sure you want to change password?"
              leftButtonColor="#198754"
              rightButtonColor="#b02a37"
              leftButtonText="Save"
              rightButtonText="Cancel"
              nextHandler={handleSubmit(nextHandler)}
            />
          )}
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
