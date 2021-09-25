import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {connect} from 'react-redux';
import {logoutAction} from '../../redux/actionCreators/auth';
import {useSelector} from 'react-redux';

import {removeFew} from '../../utils/asyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ProfileStyle';

const Profile = props => {
  const LogoutHandler = async () => {
    await props.onLogout();
    removeFew();
    props.navigation.replace('Login');
  };
  const auth = useSelector(reduxState => reduxState.auth.authInfo);
  return (
    <>
      <View style={styles.profileHeader}>
        <Image style={styles.profileImage} source={{uri: auth.profilePic}} />
        <Text style={styles.profileHeaderText}>
          {auth.userName ? auth.userName : auth.email}
        </Text>
      </View>
      <View style={styles.optionBackground}>
        <View>
          <Pressable style={styles.profileOption}>
            <Text style={styles.profileOptionText}>Your Favourites</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#999999"
            />
          </Pressable>
          <Pressable style={styles.profileOption}>
            <Text style={styles.profileOptionText}>FAQ</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#999999"
            />
          </Pressable>
          <Pressable style={styles.profileOption}>
            <Text style={styles.profileOptionText}>Help</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#999999"
            />
          </Pressable>
          <Pressable style={styles.profileOption}>
            <Text
              style={styles.profileOptionText}
              onPress={() => props.navigation.navigate('UpdateProfile')}>
              Update Profile
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#999999"
            />
          </Pressable>
        </View>
        <Pressable onPress={LogoutHandler} style={styles.logoutBtn}>
          <Text style={styles.logoutBtnTxt}>Log out</Text>
        </Pressable>
      </View>
    </>
  );
};

const mapStateToProps = ({auth, vehicle}) => {
  return {
    auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: body => {
      dispatch(logoutAction(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
