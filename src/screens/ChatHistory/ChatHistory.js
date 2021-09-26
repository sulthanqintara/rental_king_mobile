import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chat from '../Chat/Chat';
import History from '../History/History';

const Tab = createMaterialTopTabNavigator();

const ChatHistory = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '700',
          marginTop: 18,
          textTransform: 'none',
        },
        tabBarStyle: {elevation: 10},
        tabBarBounces: true,
        tabBarIndicatorStyle: {backgroundColor: '#FFCD61', height: 4},
      }}>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="History Order" component={History} />
    </Tab.Navigator>
  );
};

export default ChatHistory;
