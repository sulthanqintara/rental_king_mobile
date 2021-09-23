import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styles from './HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import ChatHistory from '../ChatHistory/ChatHistory';

const page1 = [
  {firstName: 'Akbar', lastName: 'Ramadhan'},
  {firstName: 'Berlian', lastName: 'Gymnastiar'},
  {firstName: 'Sulthan', lastName: 'Qintara'},
  {firstName: 'Candra', lastName: 'Dermawan'},
];
const page2 = [
  {firstName: 'Fakhri', lastName: 'Ridho'},
  {firstName: 'Faela', lastName: 'Asfah'},
];

const HomeContainer = props => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(prevState => [...prevState, ...page1]);
  }, [setData]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Text>Home</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          props.navigation.navigate('Profile', {
            id: 1,
            vehicleName: 'Honda KLX',
          })
        }>
        <Text style={styles.buttonText}>Go To Profile (Honda)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          props.navigation.push('Profile', {id: 2, vehicleName: 'Onthel'})
        }>
        <Text style={styles.buttonText}>Go To Profile (Onthel)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Go To Login</Text>
      </TouchableOpacity>
      {/* <ScrollView>
        {page1.concat(page2).map((person, index) => {
          return (
            <View style={styles.cardContainer} key={index}>
              <Text style={styles.cardText}>{person.firstName}</Text>
              <Text style={styles.cardText}>{person.lastName}</Text>
            </View>
          );
        })}
      </ScrollView> */}
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.cardContainer}>
              <Text style={styles.cardText}>{item.firstName}</Text>
              <Text style={styles.cardText}>{item.lastName}</Text>
            </View>
          );
        }}
        keyExtractor={(_, index) => index}
        onEndReached={() => {
          setData(prevState => [...prevState, ...page2]);
        }}
      />
    </View>
  );
};

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
      <Tab.Screen name="Home" component={HomeContainer} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Chat History" component={ChatHistory} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
/*
Home 2, Search 3, Chat 2, History 1
*/
export default Home;
