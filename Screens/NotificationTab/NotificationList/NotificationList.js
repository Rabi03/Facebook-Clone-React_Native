import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import NotificationItem from './NotificationItem';

export default function NotificationList({ notifications }) {
  return (
    <View>
      {notifications.map((notification, index) => (
        <NotificationItem key={index} item={notification} />
      ))}
    </View>
  );
}
