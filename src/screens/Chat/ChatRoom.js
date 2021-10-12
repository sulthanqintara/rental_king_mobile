import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {io} from 'socket.io-client';
import {API_URL} from '@env';
import styles from './ChatRoomStyle';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatRoomCard from '../../components/ChatRoomCard/ChatRoomCard';
import {getChat} from '../../utils/https/chat';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

const ChatRoom = props => {
  const socket = useMemo(() => io(API_URL), []);
  const auth = useSelector(state => state.auth);
  const [chatData, setChatData] = useState([]);
  const [message, setMessage] = useState('');
  const getChatHandler = () => {
    const params = {
      sender_id: auth.authInfo.user_id,
      receiver_id: props.route.params.receiverId,
    };
    getChat(params, auth.token)
      .then(data => {
        setChatData(data.data.result);
      })
      .catch(err => console.log(err));
  };

  const onSendHandler = () => {
    if (socket) {
      socket.emit('send_form', message, response => {
        console.log(response.status);
      });
      return setMessage('');
    }
  };

  useEffect(() => {
    getChatHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.headerContainer]}>
        <View style={styles.title}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={28} />
          </Pressable>
          <Text style={styles.titleTxt}>Chat Room</Text>
        </View>
      </View>
      <ScrollView style={styles.chatContainer}>
        {chatData?.map(chat => {
          return (
            <ChatRoomCard
              {...props}
              data={chat}
              senderId={chat.user_id_sender}
              key={chat.id}
            />
          );
        })}
      </ScrollView>
      <View style={styles.messageContainer}>
        <TextInput
          multiline={true}
          style={styles.messageInput}
          numberOfLines={3}
          placeholder="Type a message"
          value={message}
          onChange={e => {
            setMessage(e.nativeEvent.text);
          }}
        />
        <Ionicons name="camera" size={28} style={styles.camIcon} color="grey" />
        <Pressable onPress={onSendHandler}>
          <Ionicons
            name="send"
            size={22}
            style={styles.sendIcon}
            color="grey"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatRoom;
