import React, {useState} from 'react';
import {View, Text, Pressable, TextInput, ToastAndroid} from 'react-native';
import styles from './UpdatePasswordStyle';
import styles2 from './UpdateProfileStyle';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalComponent from '../../components/Modals/Modal';
import {useForm, Controller} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {updatePassword} from '../../utils/https/user';

const UpdatePassword = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });
  const auth = useSelector(reduxState => reduxState.auth);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const saveHandler = data => {
    if (data.newPassword !== data.newPasswordConfirm) {
      return setErrorMessage("Your new password doesn't match!");
    }
    const body = {oldPass: data.oldPassword, newPass: data.newPassword};
    updatePassword(body, auth.authInfo.user_id, auth.token)
      .then(() => {
        ToastAndroid.show('Password Changed!', ToastAndroid.SHORT);
        return props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      })
      .catch(err => {
        const stringError = String(err);
        if (stringError.includes('403')) {
          return setErrorMessage(
            "Your old password doesn't match with current password!",
          );
        }
        if (stringError.includes('500')) {
          return setErrorMessage('Check connection with server');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles2.header]}>
        <View style={styles2.title}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={28} />
          </Pressable>
          <Text style={styles2.titleTxt}>Update Password</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.fieldTitle}>Enter your old Password :</Text>
        <Controller
          control={control}
          name="oldPassword"
          defaultValue=""
          rules={{
            minLength: 6,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.fieldContainer}>
              <TextInput
                secureTextEntry={!showOldPassword}
                importantForAutofill="no"
                style={styles.field}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Old Password"
                placeholderTextColor="#BBBBBB"
              />
              <Pressable
                onPress={() => {
                  setShowOldPassword(!showOldPassword);
                }}>
                <Ionicons
                  name={showOldPassword ? 'eye' : 'eye-off'}
                  size={25}
                  color="black"
                />
              </Pressable>
            </View>
          )}
        />
        {errors.oldPassword && (
          <Text style={styles.error}>Min. 6 characters!</Text>
        )}
        <Text style={styles.fieldTitle}>Enter your new Password :</Text>
        <Controller
          control={control}
          name="newPassword"
          defaultValue=""
          rules={{
            minLength: 6,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.fieldContainer}>
              <TextInput
                importantForAutofill="no"
                secureTextEntry={!showNewPassword}
                style={styles.field}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="New Password"
                placeholderTextColor="#BBBBBB"
              />
              <Pressable
                onPress={() => {
                  setShowNewPassword(!showNewPassword);
                }}>
                <Ionicons
                  name={showNewPassword ? 'eye' : 'eye-off'}
                  size={25}
                  color="black"
                />
              </Pressable>
            </View>
          )}
        />
        {errors.newPassword && (
          <Text style={styles.error}>Min. 6 characters!</Text>
        )}
        <Text style={styles.fieldTitle}>Confirm your new Password :</Text>
        <Controller
          control={control}
          name="newPasswordConfirm"
          defaultValue=""
          rules={{
            minLength: 6,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.fieldContainer}>
              <TextInput
                importantForAutofill="no"
                secureTextEntry={!showConfirmPassword}
                style={styles.field}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm New Password"
                placeholderTextColor="#BBBBBB"
              />
              <Pressable
                onPress={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}>
                <Ionicons
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={25}
                  color="black"
                />
              </Pressable>
            </View>
          )}
        />
        {errors.newPasswordConfirm && (
          <Text style={styles.error}>Min. 6 characters!</Text>
        )}
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </ScrollView>
      <ModalComponent
        buttonText="Save Change"
        leftButtonColor="#198754"
        leftButtonText="Save"
        buttonStyle={styles2.save}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nextHandler={handleSubmit(saveHandler)}
        rightButtonColor="#b02a37"
        rightButtonText="Cancel"
        titleText="Are you sure you want to change your password?"
      />
    </View>
  );
};

export default UpdatePassword;
