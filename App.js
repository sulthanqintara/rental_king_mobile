import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Header from './src/components/Header/Header';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile/Profile';
import Login from './src/screens/Login/Login';
import SignUp from './src/screens/SignUp/SignUp';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';

const App = () => {
  const {Navigator: StackNav, Screen: StackScreen} = createStackNavigator();
  return (
    <NavigationContainer>
      <StackNav initialRouteName="HomeNav">
        <StackScreen
          name="HomeNav"
          component={Home}
          options={{headerShown: false}}
        />
        <StackScreen
          name="Profile"
          component={Profile}
          options={{
            header: props => <Header {...props} text="Profile User " />,
          }}
        />
        <StackScreen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <StackScreen
          name="Register"
          component={SignUp}
          options={{headerShown: false}}
        />
        <StackScreen
          name="Forgot"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </StackNav>
    </NavigationContainer>
  );
};

export default App;
