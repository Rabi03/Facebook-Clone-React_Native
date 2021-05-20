import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import WatchItem from './WatchItem';
import * as data from '../../../DB/db.json';

export default function WatchList({ navigation }) {
  const watchVideos = data.watch_videos;
  return (
    <View>
      {watchVideos.map((watchVideo, index) => (
        <WatchItem
          key={index}
          item={watchVideo}
          navigation={navigation}
        ></WatchItem>
      ))}
    </View>
  );
}
