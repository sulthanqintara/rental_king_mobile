import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import reduxConfig from './src/redux/store';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import SignUp from './src/screens/SignUp/SignUp';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import UpdateProfile from './src/screens/Profile/UpdateProfile';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Order from './src/screens/Order/Order';
import {PersistGate} from 'redux-persist/integration/react';
import Payment1 from './src/screens/Payment/Payment1/Payment1';
import Payment2 from './src/screens/Payment/Payment2/Payment2';
import Payment3 from './src/screens/Payment/Payment3/Payment3';
import FinishedPayment from './src/screens/FinishedPayment/FinishedPayment';
import AddItem from './src/screens/addItem/AddItem';
import Filter from './src/screens/Filter/Filter';
import EditItem from './src/screens/EditItem/EditItem';
import UpdatePassword from './src/screens/Profile/UpdatePassword';

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
              name="UpdateProfile"
              component={UpdateProfile}
              options={{headerShown: false}}
            />
            <StackScreen
              name="UpdatePassword"
              component={UpdatePassword}
              options={{headerShown: false}}
            />
            <StackScreen
              name="Order"
              component={Order}
              options={{headerShown: false}}
            />
            <StackScreen
              name="Payment1"
              component={Payment1}
              options={{headerShown: false}}
            />
            <StackScreen
              name="Payment2"
              component={Payment2}
              options={{headerShown: false}}
            />
            <StackScreen
              name="Payment3"
              component={Payment3}
              options={{headerShown: false}}
            />
            <StackScreen
              name="FinishedPayment"
              component={FinishedPayment}
              options={{headerShown: false}}
            />
            <StackScreen
              name="AddItem"
              component={AddItem}
              options={{headerShown: false}}
            />
            <StackScreen
              name="Filter"
              component={Filter}
              options={{headerShown: false}}
            />
            <StackScreen
              name="EditItem"
              component={EditItem}
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
