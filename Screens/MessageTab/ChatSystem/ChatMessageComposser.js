import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GiftedChat } from 'react-native-gifted-chat';
import EmojiBoard from 'react-native-emoji-board';
import uuid from 'react-native-uuid';

export default function ChatMessageComposser({ setMessages }) {
  const [text, setText] = useState('');
  const [Open, setOpen] = useState(false);
  const onSend = (e) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, {
        _id: uuid.v4(),
        text: text,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Rabi Islam',
          avatar: 'https://placeimg.com/140/140/any',
        },
      })
    );

    setText('');
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <Icon
          name='camera'
          style={{ fontSize: 30, color: '#0000FF', marginLeft: 10 }}
        />
        <Text
          style={{
            padding: 6,
            borderRadius: 5,
            backgroundColor: '#0000FF',
            margin: 15,
            color: '#fff',
          }}
        >
          GIF
        </Text>
        <Icon
          name='microphone'
          style={{ fontSize: 30, color: '#0000FF', marginRight: 10 }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 20,
            backgroundColor: 'rgba(0,0,0,0.2)',
            width: 200,
            padding: 10,
            alignItems: 'center',
          }}
        >
          <TextInput
            style={styles.input}
            placeholder='type a message....'
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Icon
            name='grin-beam'
            style={{ fontSize: 25, color: '#0000FF' }}
            onPress={() => setOpen(!Open)}
          />
        </View>
        <Icon
          name='paper-plane'
          style={{ fontSize: 30, color: '#0000FF', margin: 10 }}
          onPress={() => onSend(text)}
        />
      </View>
      {Open && (
        <EmojiBoard
          showBoard={Open}
          onClick={(emoji) => setText(text + emoji.code)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 160,
    height: 20,
  },
});
