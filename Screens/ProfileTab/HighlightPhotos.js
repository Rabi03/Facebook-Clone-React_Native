import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as data from '../../DB/db.json';

export default function HighlightPhotos() {
  const highlightPhotos = data.photos;
  return (
    <View style={styles.highlightPhotosWrapper}>
      {highlightPhotos.map((photo, index) => (
        <TouchableOpacity key={index} activeOpacity={0.8}>
          <Image
            style={{
              ...styles.photo,
              marginBottom: index < 6 ? 6 : 0,
              borderRadius: 10,
            }}
            source={{ uri: photo.photo_url }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  highlightPhotosWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  highLightPhoto: {},
  photo: {
    width: (SCREEN_WIDTH - 42) / 3,
    height: (SCREEN_WIDTH - 42) / 3,
  },
});
