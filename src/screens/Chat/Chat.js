import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ChatCard from '../../components/ChatCard/ChatCard';

const Chat = props => {
  return (
    <ScrollView style={styles.container}>
      <ChatCard
        {...props}
        user="Vespa Rental Jogja"
        chat="How Many Vespa left?"
        timeStamp="2 Hours ago"
      />
      <ChatCard
        {...props}
        user="Car Rental"
        chat="Okay, thank you for the good service"
        timeStamp="yesterday"
      />
      <ChatCard
        {...props}
        user="Car Rental"
        chat="Okay, thank you for the good service"
        timeStamp="yesterday"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, height: 'auto', backgroundColor: 'white'},
});

export default Chat;
