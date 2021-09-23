import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeContainer from '../HomeContainer/HomeContainer';

import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import ChatHistory from '../ChatHistory/ChatHistory';
import {logoutAction} from '../../redux/actionCreators/auth';
import {connect} from 'react-redux';

const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Chat History') {
            iconName = 'file-tray-full';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFCD61',
        tabBarInactiveTintColor: '#DFDEDE',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="HomeContainer"
        component={HomeContainer}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Chat History" component={ChatHistory} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
/*
Home 2, Search 3, Chat 2, History 1
*/
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
