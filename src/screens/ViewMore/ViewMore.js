import React, {useEffect, useState} from 'react';
import {API_URL} from '@env';
import {View, Text, FlatList, Pressable, Image, StyleSheet} from 'react-native';

import styles from '../Search/SearchStyle';
import axios from 'axios';
import {getVehicles} from '../../utils/https/vehicles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewMore = props => {
  const {navigation, route} = props;
  const [data, setData] = useState([]);
  const [nextPage, setNexPage] = useState(null);
  const type = route.params.type;

  const viewMoreHandler = () => {
    console.log('pass');
    let config = {order_by: 'v.popular_stats', sort: 'DESC', limit: '4'};
    if (type === 'car') {
      config = {...config, ...{filter_by_type: '1'}};
    }
    if (type === 'motorcycle') {
      config = {...config, ...{filter_by_type: '2'}};
    }
    if (type === 'bike') {
      config = {...config, ...{filter_by_type: '3'}};
    }
    console.log('get');
    return getVehicles(config).then(result => {
      console.log(result);
      console.log(result.data.result.nextPage);
      setNexPage(result.data.result.nextPage);
      return setData(result.data.result.data);
    });
  };

  useEffect(() => {
    viewMoreHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles2.container}>
      <View style={styles2.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back-outline" size={28} color="black" />
        </Pressable>
        {type === 'popular' && (
          <Text style={styles2.headerTitle}>Popular Vehicle</Text>
        )}
        {type === 'car' && (
          <Text style={styles2.headerTitle}>Popular Cars</Text>
        )}
        {type === 'motorcycle' && (
          <Text style={styles2.headerTitle}>Popular Motorcycles</Text>
        )}
        {type === 'bike' && (
          <Text style={styles2.headerTitle}>Popular Bicycles</Text>
        )}
      </View>
      <View style={styles2.flex1}>
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
    </View>
  );
};

const styles2 = StyleSheet.create({
  flex1: {flex: 1},
  container: {backgroundColor: 'white', flex: 1},
  header: {
    paddingHorizontal: 12,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 18,
  },
  headerTitle: {fontSize: 28, fontWeight: '600', marginLeft: 20},
});

export default ViewMore;
