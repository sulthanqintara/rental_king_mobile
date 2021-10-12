import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  TextInput,
  ScrollView,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {addVehicles} from '../../utils/https/vehicles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './AddItemStyle';
import camIcon from '../../assets/img/camCentered.png';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomModal from '../../components/Modals/Modal';

const AddItem = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const authInfo = useSelector(state => state.auth.authInfo);
  const onLocationOpen = useCallback(() => {
    setCategoryOpen(false);
  }, []);
  const onCategoryOpen = useCallback(() => {
    setLocationOpen(false);
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [location, setLocation] = useState([
    {label: 'Kalimantan', value: 'Kalimantan'},
    {label: 'Malang', value: 'Malang'},
    {label: 'South Jakarta', value: 'South Jakarta'},
    {label: 'Yogyakarta', value: 'Yogyakarta'},
  ]);
  const [category, setCategory] = useState([
    {label: 'Cars', value: 1},
    {label: 'Motorcycle', value: 2},
    {label: 'Bicycle', value: 3},
  ]);
  const [picture, setPicture] = useState('');
  const [pictureUpload, setPictureUpload] = useState({});
  const [model, setModel] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(1);

  const nextHandler = () => {
    const body = new FormData();
    pictureUpload?.fileName &&
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
    description !== '' && body.append('description', description);
    locationValue && body.append('location', locationValue);
    categoryValue && body.append('type_id', categoryValue);
    body.append('amount_available', amount);
    body.append('owner', authInfo.user_id);
    return addVehicles(body, token)
      .then(() => {
        ToastAndroid.show('Vehicle Saved!', ToastAndroid.SHORT);
      })
      .catch(err => console.log(err));
  };

  const onImagePickHandler = () => {
    launchImageLibrary({mediaType: 'photo'}, callback => {
      if (callback.assets) {
        setPicture(callback.assets[0].uri);
        setPictureUpload(callback.assets[0]);
      }
    });
  };
  const onCamPickHandler = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, callback => {
      if (callback.assets) {
        setPictureUpload(callback.assets[0]);
        setPicture(callback.assets[0].uri);
      }
    });
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={26} />
        </Pressable>
        <Text style={styles.headerTitle}>Add new Item</Text>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.headerCancel}>Cancel</Text>
        </Pressable>
      </View>
      <ScrollView>
        <Pressable
          style={styles.addPictureContainer}
          onPress={requestCameraPermission}>
          <ImageBackground
            source={picture ? {uri: picture} : camIcon}
            style={styles.addCamIcon}
            imageStyle={styles.addCamIcon}>
            <Pressable style={styles.addPicButton} onPress={onImagePickHandler}>
              <Text style={styles.addBtnTxt}>+</Text>
            </Pressable>
          </ImageBackground>
        </Pressable>
        <View style={styles.inputFormContainer}>
          <Text style={styles.inputFormTitle}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Input the product name max. 30 characters"
            onEndEditing={e => setModel(e.nativeEvent.text)}
          />
          <Text style={styles.inputFormTitle}>Price</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Input the product price"
            keyboardType="number-pad"
            onEndEditing={e => setPrice(e.nativeEvent.text)}
          />
          <Text style={styles.inputFormTitle}>Description</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type vehicle information"
            onEndEditing={e => setDescription(e.nativeEvent.text)}
          />
          <Text
            style={styles.inputFormTitle}
            onEndEditing={e => setModel(e.nativeEvent.text)}>
            Location
          </Text>
          <DropDownPicker
            containerStyle={styles.dropDownPicker}
            open={locationOpen}
            value={locationValue}
            items={location}
            setOpen={setLocationOpen}
            setValue={setLocationValue}
            setItems={setLocation}
            listMode="SCROLLVIEW"
            placeholder="Select location"
            onOpen={onLocationOpen}
            zIndex={3000}
            zIndexInverse={2000}
          />
          <Text style={styles.inputFormTitle}>Category</Text>
          <DropDownPicker
            containerStyle={styles.dropDownPicker}
            open={categoryOpen}
            value={categoryValue}
            items={category}
            setOpen={setCategoryOpen}
            setValue={setCategoryValue}
            setItems={setCategory}
            listMode="SCROLLVIEW"
            onOpen={onCategoryOpen}
            placeholder="Select Category"
            zIndex={2000}
            dropDownDirection="TOP"
            zIndexInverse={3000}
          />
          <View
            style={[
              styles.flexRow,
              styles.alignItemsCenter,
              styles.counterContainer,
            ]}>
            <Text style={styles.inputFormTitle}>Available Stock :</Text>
            <View style={[styles.flexRow, styles.counter]}>
              <Pressable style={[styles.counterButton, styles.negativeCounter]}>
                <Text
                  style={styles.counterTxt}
                  onPress={() => {
                    amount > 1 && setAmount(amount - 1);
                  }}>
                  -
                </Text>
              </Pressable>
              <Text style={styles.counterTxt}>{amount}</Text>
              <Pressable
                style={[styles.counterButton, styles.positiveCounter]}
                onPress={() => {
                  setAmount(amount + 1);
                }}>
                <Text style={styles.counterTxt}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        buttonStyle={styles.saveButton}
        buttonText="Save product"
        titleText="Are you sure you want to save item?"
        leftButtonColor="#198754"
        rightButtonColor="#b02a37"
        leftButtonText="Save"
        rightButtonText="Cancel"
        nextHandler={nextHandler}
      />
    </View>
  );
};

export default AddItem;
