/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {profileAction} from '../../redux/actionCreators/auth';

import {RadioButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './UpdateProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalComponent from '../../components/Modals/Modal';

const UpdateProfile = props => {
  const auth = useSelector(reduxState => reduxState.auth.authInfo);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [gender, setGender] = useState(auth.gender);
  const [name, setName] = useState(auth.userName);
  const [email, setEmail] = useState(auth.email);
  const [phone, setPhone] = useState(auth.phone);
  const [dob, setDob] = useState(new Date(auth.dob));
  const [address, setAddress] = useState(auth.address);

  const saveHandler = () => {
    const form = new FormData();
    form.append('gender', gender);
    form.append('name', name);
    form.append('email', email);
    form.append('phone_number', phone);
    form.append(
      'DOB',
      `${dob.getFullYear()}-${dob.getMonth()}-${dob.getDate()}`,
    );
    form.append('address', address);
    dispatch(profileAction(form, auth.user_id));
    ToastAndroid.show('Profile Updated!', ToastAndroid.SHORT);
  };

  return (
    <View style={{flex: 1}}>
      <View style={[styles.header, styles.container]}>
        <View style={styles.title}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={28} />
          </Pressable>
          <Text style={styles.titleTxt}>Update Profile</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <ImageBackground
            style={styles.profilePic}
            source={{uri: auth.profilePic}}
            imageStyle={{borderRadius: 50}}>
            <View style={styles.profilebtn}>
              {/* <Ionicons name="create-outline" size={20} /> */}
              <MaterialIcons name="edit" size={20} />
            </View>
          </ImageBackground>
        </View>
        <RadioButton.Group
          onValueChange={newValue => setGender(newValue)}
          value={gender}>
          <View style={styles.gender}>
            <View style={styles.genderOptions}>
              <Text>Female</Text>
              <RadioButton value={1} color="#FFCD61" />
            </View>
            <View style={styles.genderOptions}>
              <Text>Male</Text>
              <RadioButton value={0} color="#FFCD61" />
            </View>
          </View>
        </RadioButton.Group>
        <Text style={styles.subTitle}>Name :</Text>
        <TextInput
          style={styles.field}
          defaultValue={name}
          onEndEditing={e => {
            setName(e.nativeEvent.text);
          }}
        />
        <Text style={styles.subTitle}>Email Address :</Text>
        <TextInput
          style={styles.field}
          defaultValue={email}
          onEndEditing={e => {
            setEmail(e.nativeEvent.text);
          }}
        />
        <Text style={styles.subTitle}>Phone Number :</Text>
        <TextInput
          style={styles.field}
          defaultValue={phone}
          onEndEditing={e => {
            setPhone(e.nativeEvent.text);
          }}
        />
        <Text style={styles.subTitle}>Date of Birth :</Text>
        <Pressable style={styles.field} onPress={() => setOpen(true)}>
          <Text>{dob.toDateString()}</Text>
        </Pressable>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={dob}
          onConfirm={date => {
            setOpen(false);
            setDob(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Text style={styles.subTitle}>Address :</Text>
        <TextInput
          style={styles.field}
          defaultValue={address}
          onEndEditing={e => {
            setAddress(e.nativeEvent.text);
          }}
        />
        <ModalComponent
          buttonText="Save Change"
          leftButtonColor="#198754"
          leftButtonText="Save"
          buttonStyle={styles.save}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          nextHandler={saveHandler}
          rightButtonColor="#b02a37"
          rightButtonText="Cancel"
          titleText="Are you sure you want to Save?"
        />
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;
