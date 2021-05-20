import React, { Component, useCallback, useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper';
import StoryDetailItem from './StoryDetailItem';

import * as data from '../../../../DB/db.json';

export default function StoryDetail({ route, navigation }) {
  let { position } = route.params;
  const [StoryPosition, setStoryPosition] = useState(position);

  const _swiper = useRef();
  const onIndexChangedHandle = useCallback((index) => {
    setTimeout(() => {
      setStoryPosition(index);
    }, 50);
  }, []);
  return (
    <Swiper
      ref={_swiper}
      //   onIndexChanged={(index) => onIndexChangedHandle(index)}
      index={position}
      loop={false}
      showsPagination={false}
    >
      {data.stories.map((story, index) => (
        <StoryDetailItem
          swiper={_swiper}
          StoryPosition={StoryPosition}
          position={index}
          key={story.id}
          storyDetail={story}
          navigation={navigation}
          stories={data.stories}
        ></StoryDetailItem>
      ))}
    </Swiper>
  );
}
