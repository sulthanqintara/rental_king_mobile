import React, {useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {connect} from 'react-redux';
import {logoutAction} from '../../redux/actionCreators/auth';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';

import {removeFew} from '../../utils/asyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ProfileStyle';
import LogoutModal from '../../components/Modals/Modal';

const Profile = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const LogoutHandler = async () => {
    await props.onLogout();
    removeFew();
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const auth = useSelector(reduxState => reduxState.auth.authInfo);
  return (
    <>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={
            auth.profilePic
              ? {uri: API_URL + auth.profilePic}
              : {uri: API_URL + '/img/profile-icon-png-898.png'}
          }
        />
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
        <LogoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          buttonStyle={styles.logoutBtn}
          nextHandler={LogoutHandler}
          buttonText="Log out"
          leftButtonText="Yes, Log me out"
          rightButtonText="Cancel"
          titleText="Are you sure you want to log out?"
          leftButtonColor="#b02a37"
        />
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
