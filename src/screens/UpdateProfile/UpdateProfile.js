import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './UpdateProfileStyle';

const UpdateProfile = () => {
  const auth = useSelector(reduxState => reduxState.auth.authInfo);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Ionicons name="chevron-back-outline" size={28} />
          <Text style={styles.titleTxt}>Update Profile</Text>
        </View>
        <Image style={styles.profilePic} source={{uri: auth.profilePic}} />
      </View>
      <View>
        <Text>asd</Text>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
