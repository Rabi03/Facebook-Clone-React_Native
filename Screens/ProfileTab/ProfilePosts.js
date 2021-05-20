import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ProfilePostItem from './ProfilePostItem';
import * as data from '../../DB/db.json';

export default function ProfilePosts({ navigation }) {
  const profilePosts = data.posts;
  if (profilePosts === undefined || profilePosts.length == 0)
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          This profile doesn't have any posts.
        </Text>
      </View>
    );
  return (
    <View style={{ ...styles.container, paddingVertical: 0 }}>
      {profilePosts.map((post, index) => (
        <ProfilePostItem key={index} item={post} navigation={navigation} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginVertical: 15,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});
