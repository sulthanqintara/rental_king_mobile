import React, {useState} from 'react';
import {View, Text, FlatList, Image, TextInput, Pressable} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './SearchStyle';
import {getVehicles} from '../../utils/https/vehicles';

const Search = ({navigation, filter, route}) => {
  const [data, setData] = useState([]);
  const [nextPage, setNexPage] = useState(null);
  const params = route.params;
  const date = params?.date ? params.date : null;
  const location = params?.location ? params.location : null;
  const maxPrice = params?.maxPrice ? params.maxPrice : null;
  const minPrice = params?.minPrice ? params.minPrice : null;
  const rating = params?.rating ? params.rating : null;
  const type = params?.type ? params.type : null;

  const inputSearchHandler = search => {
    let config = search && {keyword: search};
    if (location) {
      config = {...config, ...{location: location}};
    }
    if (maxPrice) {
      config = {...config, ...{max_price: maxPrice}};
    }
    if (minPrice) {
      config = {...config, ...{min_price: minPrice}};
    }
    if (type) {
      config = {...config, ...{filter_by_type: type}};
    }
    return getVehicles(config).then(result => {
      console.log(result);
      setNexPage(result.data.result.nextPage);
      return setData(result.data.result.data);
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.header}
        onPress={() => {
          navigation.navigate('Filter', {
            date,
            location,
            minPrice,
            maxPrice,
            rating,
            type,
          });
        }}>
        <Text style={styles.filterText}>
          Filter{location ? ` - ${location}` : ''}
          {maxPrice ? ` - Rp. ${maxPrice} to ` : ''}
          {minPrice ? `Rp. ${minPrice}` : ''}
          {type === 1 && ' - Car'}
          {type === 2 && ' - Motorcycle'}
          {type === 3 && ' - Bicycle'}
        </Text>
        <MaterialIcons name="filter-alt" size={22} color="#3939394D" />
      </Pressable>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onEndEditing={e => {
            inputSearchHandler(e.nativeEvent.text);
            console.log('pass');
          }}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          const pic = (API_URL + item.picture).split(',')[0];
          return (
            <Pressable
              elevation={3}
              style={styles.cardContainer}
              onPress={() => {
                navigation.navigate('Order', {id: item.id});
              }}>
              <Image source={{uri: pic}} style={styles.cardImage} />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardLocation}>
                  {item.location}, X miles from your location
                </Text>
                <View style={styles.cardBottomTextContainer}>
                  <View style={styles.cardBottomLeftContainer}>
                    <Text style={styles.cardModel}>{item.model}</Text>
                    {item.amount_available > 0 ? (
                      <Text style={styles.available}>Available</Text>
                    ) : (
                      <Text style={styles.notAvailable}>Not Available</Text>
                    )}
                  </View>
                  <Text>Rp. {item.price}/day</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(_, index) => index}
        onEndReached={() => {
          nextPage !== null &&
            axios.get(API_URL + nextPage).then(result => {
              setNexPage(result.data.result.nextPage);
              return setData(prevState => [
                ...prevState,
                ...result.data.result.data,
              ]);
            });
        }}
      />
    </View>
  );
};

export default Search;
