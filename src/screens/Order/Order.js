/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ToastAndroid,
} from 'react-native';
import styles from './OrderStyle';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Order = props => {
  const {route} = props;
  const [available, setAvailable] = useState('');
  const [location, setLocation] = useState('');
  const [model, setModel] = useState('');
  const [picture, setPicture] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [favourite, setFavourite] = useState(false);

  const [open, setOpen] = useState(false);
  const [ReserveDate, setReserveDate] = useState('Select Date');

  useEffect(() => {
    const url = 'http://192.168.0.100:8000/vehicles';
    const id = route.params.id;
    axios
      .get(url, {
        params: {id: id},
      })
      .then(({data}) => {
        const arrayResult = data.result[0];
        setAvailable(arrayResult.amount_available);
        setLocation(arrayResult.location);
        setModel(arrayResult.model);
        setPicture(arrayResult.picture);
        setPrice(arrayResult.price);
        setCategory(arrayResult.category);
        setOwnerId(arrayResult.owner);
        console.log(data);
      })
      .catch(err => console.log(err.response));
  }, []);

  return (
    <View>
      <ImageBackground style={styles.header} source={{uri: picture}}>
        <View style={styles.headerController}>
          <Pressable style={styles.back}>
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
            Rp. {price}/day
          </Text>
          <Pressable>
            <Ionicons name="chatbubble-outline" color="#FFCD61" size={35} />
          </Pressable>
        </View>
        <Text style={styles.textPadding}>Max for 2 person</Text>
        <Text style={styles.textPadding}>No prepayment</Text>
        <Text style={available ? styles.greenTxt : styles.redTxt}>
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
            <View style={styles.counterBtn}>
              <Text style={styles.selectorTitle}>-</Text>
            </View>
            <Text style={styles.amount}> {available} </Text>
            <View style={styles.counterBtn}>
              <Text style={styles.selectorTitle}>+</Text>
            </View>
          </View>
        </View>
        <View>
          <Pressable style={styles.date} onPress={() => setOpen(true)}>
            <Text>
              {typeof ReserveDate === 'object'
                ? ReserveDate.toLocaleDateString('en-CA')
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
        </View>
      </View>
    </View>
  );
};

export default Order;
