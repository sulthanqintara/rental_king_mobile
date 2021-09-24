import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import reduxConfig from './src/redux/store';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import SignUp from './src/screens/SignUp/SignUp';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import {PersistGate} from 'redux-persist/integration/react';

const redux = reduxConfig();

const App = () => {
  const {Navigator: StackNav, Screen: StackScreen} = createStackNavigator();
  return (
    <Provider store={redux.reduxStore}>
      <PersistGate persistor={redux.persist}>
        <NavigationContainer>
          <StackNav initialRouteName={'SplashScreen'}>
            <StackScreen
              name="Home"
              component={Home}
              options={{headerShown: false}}
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
            <StackScreen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          </StackNav>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
