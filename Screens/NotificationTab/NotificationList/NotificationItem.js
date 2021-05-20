import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { SCREEN_WIDTH } from '../../../constants/constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import * as data from '../../../DB/db.json';

export default function NotificationItem({ item }) {
  let iconColor;
  switch (item.react) {
    case 'thumbs-up':
      iconColor = '#318bfb';
      break;
    case 'heart':
      iconColor = '#e8304a';
      break;
    case 'user':
      iconColor = '#318bfb';
      break;
    case 'smile-beam':
      iconColor = '#f7ca51';
      break;
    case 'image':
      iconColor = '#63BE09';
      break;
    case 'comment':
      iconColor = '#63BE20';
      break;
    case 'envelope':
      iconColor = '#63BE20';
      break;
  }

  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <TouchableOpacity
        style={{
          ...styles.container,
          backgroundColor: item.isSeen ? '#fff' : '#edf2fa',
        }}
      >
        <ImageBackground
          imageStyle={{ borderRadius: 64 }}
          style={styles.avatar}
          source={{ uri: data.users[item.userId].avatar_url }}
        >
          <View
            style={{
              ...styles.notificationIcon,
              backgroundColor: '#fff',
            }}
          >
            <FontAwesome5Icon
              name={item.react}
              style={{ fontSize: 14, color: iconColor }}
            />
          </View>
        </ImageBackground>
        <View style={styles.contentWrapper}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>{item.name + ' '}</Text>{' '}
            {item.content}
          </Text>
          <Text style={{ color: '#333' }}>{item.create_at}</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome5Icon name='ellipsis-h' />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  avatar: {
    height: 64,
    width: 64,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  contentWrapper: {
    width: SCREEN_WIDTH - 40 - 30 - 64,
    paddingHorizontal: 10,
  },
  mainContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnOptions: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  pureTxt: {
    fontSize: 16,
  },
  hightlightTxt: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
