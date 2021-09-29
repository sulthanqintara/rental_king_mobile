import React from 'react';
import {Image, Pressable} from 'react-native';
import {API_URL} from '@env';

const HomeCard = props => {
  const {img, navigation, id} = props;
  return (
    <Pressable
      onPress={async () => {
        await navigation.navigate('Order', {id: id});
      }}>
      <Image style={styles.image} source={{uri: API_URL + img}} />
    </Pressable>
  );
};

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 265,
    height: 168,
    resizeMode: 'cover',
    marginHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#737373',
  },
});

export default HomeCard;
