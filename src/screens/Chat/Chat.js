import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ChatCard from '../../components/ChatCard/ChatCard';
import {getLatestChat} from '../../utils/https/chat';

const Chat = props => {
  const auth = useSelector(state => state.auth);
  const [chatData, setChatData] = useState([]);

  const getLatestChatHandler = () => {
    getLatestChat(auth.authInfo.user_id, auth.token)
      .then(data => setChatData(data.data.result))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getLatestChatHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      {chatData?.map(chat => {
        return (
          <ChatCard
            key={chat.id}
            {...props}
            user={
              chat.user_id_receiver !== auth.authInfo.user_id
                ? chat.receiver_name
                : chat.sender_name
            }
            chat={chat.message}
            timeStamp="2 Hours ago"
            receiverId={
              chat.user_id_receiver !== auth.authInfo.user_id
                ? chat.user_id_receiver
                : chat.user_id_sender
            }
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, height: 'auto', backgroundColor: 'white'},
});

export default Chat;
