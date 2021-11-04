/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import styles2 from './EditItemStyle';
import styles from '../Order/OrderStyle';
import axios from 'axios';
import {API_URL} from '@env';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import CustomModal from '../../components/Modals/Modal';
import {TextInput} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {patchVehicle} from '../../utils/https/vehicles';
import {ActivityIndicator, Colors} from 'react-native-paper';

const Order = props => {
  const {route, navigation} = props;
  const auth = useSelector(reduxState => reduxState.auth);
  const id = route.params.id;

  const [available, setAvailable] = useState('');
  const [location, setLocation] = useState('');
  const [model, setModel] = useState('');
  const [picture, setPicture] = useState('');
  const [pictureUpload, setPictureUpload] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [categoryVisible, setCategoryVisible] = useState(false);

  const nextHandler = () => {
    const body = new FormData();
    pictureUpload !== '' &&
      body.append('picture', {
        name: pictureUpload.fileName,
        type: pictureUpload.type,
        uri:
          Platform.OS === 'android'
            ? pictureUpload.uri
            : pictureUpload.uri.replace('file://', ''),
      });
    model !== '' && body.append('model', model);
    price !== 0 && body.append('price', price);
    location && body.append('location', location);
    category && body.append('type_id', category);
    body.append('amount_available', count);
    return patchVehicle(body, id, auth.token)
      .then(() => {
        ToastAndroid.show('Vehicle Saved!', ToastAndroid.SHORT);
        navigation.navigate('Order', {id});
      })
      .catch(err => {
        ToastAndroid.show('Internal Server Error!', ToastAndroid.SHORT);
        console.log(err);
      });
  };

  const onImagePickHandler = () => {
    launchImageLibrary(
      {mediaType: 'photo', maxHeight: 500, maxWidth: 500, quality: 0.75},
      callback => {
        if (callback.assets) {
          setPicture(callback.assets[0].uri);
          setPictureUpload(callback.assets[0]);
        }
      },
    );
  };
  const onCamPickHandler = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.75,
      },
      callback => {
        if (callback.assets) {
          setPictureUpload(callback.assets[0]);
          setPicture(callback.assets[0].uri);
        }
      },
    );
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        onCamPickHandler();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const url = `${API_URL}/vehicles`;
    axios
      .get(url, {
        params: {id: id},
      })
      .then(data => {
        setVisible(false);
        const arrayResult = data.data.result.data[0];
        setAvailable(arrayResult.amount_available);
        setCount(arrayResult.amount_available);
        setLocation(arrayResult.location);
        setModel(arrayResult.model);
        setPicture(API_URL + arrayResult.picture);
        setPrice(arrayResult.price);
        switch (arrayResult.category) {
          case 'Cars':
            return setCategory(1);
          case 'Motorcycle':
            return setCategory(2);
          case 'Bicycle':
            return setCategory(3);
          default:
            break;
        }
        setCategory(arrayResult.category);
        // setOwner(arrayResult.owner);
      })
      .catch(err => console.log(err.response));
  }, []);

  return (
    <ScrollView>
      <Pressable>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setVisible(!visible);
          }}>
          <View style={styles.centeredView}>
            <ActivityIndicator animating={true} color={Colors.red800} />
          </View>
        </Modal>
        <ImageBackground
          style={styles.header}
          source={{uri: picture.split(',')[0]}}>
          <View style={styles.headerController}>
            <Pressable
              style={styles.back}
              onPress={() => {
                navigation.goBack();
              }}>
              <Ionicons name="chevron-back-outline" size={28} color="white" />
            </Pressable>
            <View style={styles.rightHeader}>
              <View style={styles.rating}>
                <Text style={styles.ratingTxt}>4.5</Text>
                <Ionicons name="star" color="white" />
              </View>
              <Pressable style={styles2.marginPic} onPress={onImagePickHandler}>
                <Ionicons name="image-outline" color="white" size={32} />
              </Pressable>
              <Pressable onPress={requestCameraPermission}>
                <Ionicons name="camera-outline" color="white" size={32} />
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
      <View style={styles.container}>
        <View style={styles2.titleContainer}>
          <TextInput
            onEndEditing={e => setModel(e.nativeEvent.text)}
            style={[styles.title, styles2.title]}
            defaultValue={model}
          />
          <View style={styles2.flexRow}>
            <Text style={styles2.title}>Rp. </Text>
            <TextInput
              onEndEditing={e => setPrice(e.nativeEvent.text)}
              style={styles2.title}
              defaultValue={String(price)}
            />
            <Text style={styles2.title}>/day</Text>
          </View>
        </View>
        <Text style={styles.textPadding}>Max for 2 person</Text>
        <Text style={styles.textPadding}>No prepayment</Text>
        <Text style={available ? styles.availableTxt : styles.notAvailableTxt}>
          {available > 0 ? 'Available' : 'Not Available'}
        </Text>
        <View style={styles.location}>
          <View style={styles.locationLogo}>
            <Ionicons name="location-sharp" color="#F8A170" size={20} />
          </View>
          <TextInput
            onEndEditing={e => setLocation(e.nativeEvent.text)}
            style={[styles.grayTxt, styles2.negativePadding]}
            defaultValue={location}
          />
        </View>
        <View style={styles.location}>
          <View style={styles.locationLogo}>
            <MaterialIcons name="directions-run" color="#F8A170" size={20} />
          </View>
          <Text style={styles.grayTxt}>X miles from your location</Text>
        </View>
        <View style={styles.selector}>
          <Text style={styles.selectorTitle}>Update Stock</Text>
          <View style={styles.counter}>
            <Pressable
              onPress={() => count > 1 && setCount(count - 1)}
              style={styles.counterBtn}>
              <Text style={styles.selectorTitle}>-</Text>
            </Pressable>
            <Text style={styles.amount}> {count} </Text>
            <Pressable
              onPress={() => setCount(count + 1)}
              style={styles.counterBtn}>
              <Text style={styles.selectorTitle}>+</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={styles2.inputAndroid}
          onPress={() => {
            setCategoryVisible(true);
          }}>
          <Text>
            {category === 1 && 'Car'}
            {category === 2 && 'Motorcycle'}
            {category === 3 && 'Bicycle'}
          </Text>
        </Pressable>
        <Modal
          animationType="fade"
          transparent={true}
          visible={categoryVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setCategoryVisible(!categoryVisible);
          }}>
          <View style={styles2.centeredView}>
            <View style={styles2.modalView}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#b3b3b3' : 'white',
                  },
                  styles2.selection,
                ]}
                onPress={() => {
                  setCategory(1);
                  setCategoryVisible(!categoryVisible);
                }}>
                <Text style={styles2.textStyle}>Car</Text>
              </Pressable>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#b3b3b3' : 'white',
                  },
                  styles2.selection,
                ]}
                onPress={() => {
                  setCategory(2);
                  setCategoryVisible(!categoryVisible);
                }}>
                <Text style={styles2.textStyle}>Motorcycle</Text>
              </Pressable>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#b3b3b3' : 'white',
                  },
                  styles2.selection,
                ]}
                onPress={() => {
                  setCategory(3);
                  setCategoryVisible(!categoryVisible);
                }}>
                <Text style={styles2.textStyle}>Bicycle</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <CustomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          buttonStyle={styles.reserve}
          buttonText="Save product"
          titleText="Are you sure you want to save item?"
          leftButtonColor="#198754"
          rightButtonColor="#b02a37"
          leftButtonText="Save"
          rightButtonText="Cancel"
          nextHandler={nextHandler}
        />
      </View>
    </ScrollView>
  );
};

export default Order;
