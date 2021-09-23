import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './HeaderStyle';

const Header = ({text, navigation, route}) => {
  //   const extraTitle = route.params?.vehicleName || '';
  return (
    <View style={styles.headerContainer}>
      <Icon
        name="chevron-back-outline"
        size={40}
        color="#fff"
        onPress={() => navigation.goBack()}
      />
      {/* <Text style={styles.headerText}>{text + +' ' + extraTitle}</Text> */}
      <Text style={styles.headerText}>
        {route.params?.vehicleName || 'Vehicle'}
      </Text>
    </View>
  );
};

export default Header;
