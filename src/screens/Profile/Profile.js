import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const profile = props => {
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Home');
        }}>
        <Text>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
