import React from 'react';
import {Text} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styles from './YellowButtonStyle';

const YellowButton = ({text}) => {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default YellowButton;
