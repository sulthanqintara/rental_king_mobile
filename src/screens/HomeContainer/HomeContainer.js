import React from 'react';

import {Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {connect} from 'react-redux';
import {logoutAction} from '../../redux/actionCreators/auth';
import {getData, removeFew} from '../../utils/asyncStorage';

const HomeContainer = props => {
  const LogoutHandler = async () => {
    console.log(props);
    props.onLogout();
    getData('token').then(data => console.log(data));
    removeFew();
    props.navigation.replace('Login');
  };
  return (
    <View>
      <Pressable onPress={LogoutHandler}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

const mapStateToProps = ({auth}) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
