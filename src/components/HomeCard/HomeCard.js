import React from 'react';
import {Image, Pressable} from 'react-native';

const HomeCard = ({img}) => {
  return (
    <Pressable>
      <Image style={styles.image} source={{uri: img}} />
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
