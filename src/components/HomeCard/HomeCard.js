import React from 'react';
import {Image, Pressable} from 'react-native';

const HomeCard = ({img}) => {
  return (
    <Pressable>
      {console.log(img)}
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
  },
});

export default HomeCard;
