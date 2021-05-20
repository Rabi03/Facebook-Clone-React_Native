import { Thumbnail, View } from 'native-base';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatMessageComposser from './ChatMessageComposser';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text } from 'react-native';

export default function ChatMessages({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Are you busy Now? I need help',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'JP. Morgan',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hlw Morgan',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Rabi Islam',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello Rabi',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'JP. Morgan',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  return (
    <View style={{ flex: 1, marginBottom: 18 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
          borderBottomColor: 'rgba(0,0,0,0.1)',
          borderBottomWidth: 1,
          padding: 5,
        }}
      >
        <Icon
          name='arrow-left'
          style={{ fontSize: 25, marginLeft: 5, marginRight: 15 }}
          onPress={() => navigation.navigate('Message')}
        />
        <Thumbnail
          source={{
            uri: 'https://st4.depositphotos.com/12982378/22072/i/600/depositphotos_220729084-stock-photo-smiling-adult-man-crossed-arms.jpg',
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Rabi Islam</Text>
          <Text>Active Now</Text>
        </View>

        <Icon name='phone' style={{ fontSize: 25, marginLeft: 'auto' }} />
        <Icon name='video' style={{ fontSize: 25, margin: 15 }} />
        <Icon name='cog' style={{ fontSize: 25 }} />
      </View>
      <GiftedChat
        messages={messages}
        user={{
          _id: 1,
        }}
        renderUsernameOnMessage={true}
        alignTop={true}
        inverted={true}
        renderInputToolbar={() => (
          <ChatMessageComposser setMessages={setMessages} />
        )}
      />
    </View>
  );
}
