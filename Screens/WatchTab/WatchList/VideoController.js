import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { Video } from 'expo-av';
import { SCREEN_WIDTH } from '../../../constants/constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function VideoController({ item }) {
  let _isMuted = false;
  let _videoRef = useRef();
  const [volume, setVolume] = useState(0);

  let _isFinished = false;
  let _volumeIconOpacity = new Animated.Value(1);

  const onPressToggleVolumeHandler = () => {
    setVolume((volume) => (volume == 0 ? 1 : 0));
  };
  const volumeIconOpacity = _volumeIconOpacity;
  const muteVolumeIconOpacity = _volumeIconOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  return (
    <View style={styles.container}>
      <Video
        ref={_videoRef}
        source={{ uri: item.video.video_url }}
        rate={1.0}
        volume={volume}
        isLooping={true}
        // isMuted={_isMuted}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        shouldPlay={false}
        style={styles.video}
      />
      <TouchableOpacity
        style={styles.btnToggleVolume}
        onPress={onPressToggleVolumeHandler.bind(this)}
      >
        <Animated.View
          style={{ position: 'absolute', opacity: muteVolumeIconOpacity }}
        >
          <FontAwesome5Icon color='#fff' name='volume-mute' size={20} />
        </Animated.View>
        <Animated.View style={{ opacity: volumeIconOpacity }}>
          <FontAwesome5Icon color='#fff' name='volume-up' size={20} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  video: {
    width: SCREEN_WIDTH,
    height: 300,
    backgroundColor: '#000',
  },
  btnToggleVolume: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  poster: {
    backgroundColor: '#000',
  },
});
