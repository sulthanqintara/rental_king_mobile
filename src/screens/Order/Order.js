/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ToastAndroid,
  ScrollView,
  Modal,
} from 'react-native';
import styles from './OrderStyle';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {API_URL} from '@env';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import imagePlaceholder from '../../assets/img/imagePlaceholder.png';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Colors} from 'react-native-paper';

const Order = props => {
  const {route, navigation} = props;
  const auth = useSelector(reduxState => reduxState.auth.authInfo);

  const [available, setAvailable] = useState('');
  const [location, setLocation] = useState('');
  const [model, setModel] = useState('');
  const [picture, setPicture] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [favourite, setFavourite] = useState(false);
  const [count, setCount] = useState(1);
  const [duration, setDuration] = useState(1);
  const [ReserveDate, setReserveDate] = useState('Select Date');
  const [owner, setOwner] = useState(null);
  const [visible, setVisible] = useState(true);

  const [open, setOpen] = useState(false);
  const id = route.params.id;

  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const formatDate = date => {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };

  const onPressHandler = () => {
    const nextData = {
      user_id: auth.user_id,
      model_id: id,
      amount_rented: count,
      prepayment: count * price * duration,
      rent_start_date: formatDate(addDays(ReserveDate, 0)),
      rent_finish_date: formatDate(addDays(ReserveDate, duration)),
      vehicleImage: picture,
      model,
      duration,
    };
    if (typeof ReserveDate === 'string') {
      return ToastAndroid.show(
        'Please select date to reserve!',
        ToastAndroid.SHORT,
      );
    }
    return navigation.navigate('Payment1', nextData);
  };
  const ownerHandler = () => {
    navigation.navigate('EditItem', {id});
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
        setLocation(arrayResult.location);
        setModel(arrayResult.model);
        setPicture(API_URL + arrayResult.picture);
        setPrice(arrayResult.price);
        setCategory(arrayResult.category);
        setOwner(arrayResult.owner);
      })
      .catch(err => console.log(err.response));
  }, []);

  return (
    <ScrollView>
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
        source={
          picture.split(API_URL)[1]
            ? {uri: picture.split(',')[0]}
            : imagePlaceholder
        }>
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
            <Pressable
              onPress={() => {
                setFavourite(!favourite);
                ToastAndroid.show(
                  favourite ? 'Removed from Favourite' : 'Added to Favourite',
                  ToastAndroid.SHORT,
                );
              }}>
              <Ionicons
                name={favourite === false ? 'heart-outline' : 'heart'}
                color="white"
                size={25}
              />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {model}
            {'\n'}
            Rp. {price * count}/day
          </Text>
          <Pressable>
            {auth.authLevel === 3 && (
              <Ionicons name="chatbubble-outline" color="#FFCD61" size={35} />
            )}
          </Pressable>
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
          <Text style={styles.grayTxt}>{location}</Text>
        </View>
        <View style={styles.location}>
          <View style={styles.locationLogo}>
            <MaterialIcons name="directions-run" color="#F8A170" size={20} />
          </View>
          <Text style={styles.grayTxt}>X miles from your location</Text>
        </View>
        <View style={styles.selector}>
          <Text style={styles.selectorTitle}>Select {category}(s)</Text>
          <View style={styles.counter}>
            <Pressable
              onPress={() => count > 1 && setCount(count - 1)}
              style={styles.counterBtn}>
              <Text style={styles.selectorTitle}>-</Text>
            </Pressable>
            <Text style={styles.amount}> {count} </Text>
            <Pressable
              onPress={() => count < available && setCount(count + 1)}
              style={styles.counterBtn}>
              <Text style={styles.selectorTitle}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.picker}>
          <Pressable style={styles.date} onPress={() => setOpen(true)}>
            <Text>
              {typeof ReserveDate === 'object'
                ? ReserveDate.toDateString()
                : ReserveDate}
            </Text>
          </Pressable>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={typeof ReserveDate === 'object' ? ReserveDate : new Date()}
            onConfirm={date => {
              setOpen(false);
              setReserveDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <RNPickerSelect
            placeholder={{}}
            onValueChange={value => setDuration(value)}
            useNativeAndroidPickerStyle={false}
            style={styles}
            items={[
              {label: '1 Day', value: 1},
              {label: '2 Days', value: 2},
              {label: '3 Days', value: 3},
            ]}
            Icon={() => {
              return (
                <Ionicons
                  name="caret-down"
                  size={20}
                  color="gray"
                  style={styles.dropdownIcon}
                />
              );
            }}
          />
        </View>
        <Pressable
          style={available ? styles.reserve : styles.reserveDisabled}
          onPress={owner === auth.authLevel ? ownerHandler : onPressHandler}
          disabled={available <= 0 ? true : false}>
          <Text
            style={
              available
                ? styles.reserveTxt
                : [styles.reserveTxt, styles.disabledReseveTxt]
            }>
            {owner === auth.authLevel ? 'Edit Item' : 'Reservation'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Order;
