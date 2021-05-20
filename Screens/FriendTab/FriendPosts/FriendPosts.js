import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as data from '../../../DB/db.json';
import FriendPostItem from './FriendPostItem';

export default function FriendPosts({ navigation }) {
  return (
    <View>
      {data.group_posts.map((item, index) => (
        <FriendPostItem key={index} item={item} navigation={navigation} />
      ))}
    </View>
  );
}
