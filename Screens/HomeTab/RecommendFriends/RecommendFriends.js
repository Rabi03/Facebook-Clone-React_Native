import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RecommendItem from './RecommendItem';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useRef } from 'react';

import * as data from '../../../DB/db.json';
import { useState } from 'react';

export default function RecommendFriends({ navigation }) {
  const [_pivotX, set_pivotX] = useState(0);
  const _scrollView = useRef();
  const onPressViewAllRecommendsHandler = () => {
    navigation.navigate('FindFriends', { friends: {} });
  };
  const onScrollHandler = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (_pivotX === offsetX) return;
    const calculatedNumber = Math.floor(
      offsetX / (0.6 * 0.5 * screenWidth + 5)
    );
    if (calculatedNumber > 0) {
      if (calculatedNumber == 1 && _pivotX < offsetX) {
        _scrollView.current.scrollTo({
          y: 0,
          x: 0.6 * screenWidth * 0.75 + 5,
          animated: true,
        });
      } else if (calculatedNumber > 1) {
        let nextStack = 0;
        if (calculatedNumber % 2 === 1) {
          nextStack = calculatedNumber;
        } else {
          nextStack = calculatedNumber - 1;
        }
        let nextOffsetX =
          nextStack * (0.5 * 0.6 * screenWidth + 5) + 0.25 * 0.6 * screenWidth;
        _scrollView.current.scrollTo({
          y: 0,
          x: nextOffsetX,
          animated: true,
        });
      }
    } else {
      _scrollView.current.scrollTo({
        y: 0,
        x: 0,
        animated: true,
      });
    }
    set_pivotX(offsetX);
  };
  const recommendFriends = data.recommend_friends;
  if (recommendFriends === undefined || recommendFriends.length === 0)
    return <View></View>;
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>
          People you can know
        </Text>
        <TouchableOpacity style={styles.btnOptions}>
          <FontAwesome5Icon
            name='ellipsis-h'
            color='#333'
            size={20}
          ></FontAwesome5Icon>
        </TouchableOpacity>
      </View>
      <ScrollView
        decelerationRate={0.5}
        scrollEventThrottle={30}
        showsHorizontalScrollIndicator={false}
        ref={_scrollView}
        onMomentumScrollEnd={onScrollHandler.bind(this)}
        onScrollEndDrag={onScrollHandler.bind(this)}
        style={styles.recommendsWrapper}
        bounces={false}
        horizontal={true}
      >
        {recommendFriends.map((profile, index) => (
          <RecommendItem
            key={index}
            info={profile}
            navigation={navigation}
          ></RecommendItem>
        ))}
      </ScrollView>
      <View>
        <TouchableOpacity
          onPress={onPressViewAllRecommendsHandler}
          style={styles.btnSeeAll}
        >
          <Text>See all recommends</Text>
          <FontAwesome5Icon
            style={styles.seeAllIcon}
            name='chevron-right'
          ></FontAwesome5Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  headerWrapper: {
    paddingLeft: 5,
    position: 'relative',
    paddingBottom: 10,
  },
  btnOptions: {
    position: 'absolute',
    right: 10,
    top: 0,
  },
  recommendsWrapper: {
    marginBottom: 10,
  },
  btnSeeAll: {
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  seeAllIcon: {
    marginLeft: 5,
    fontWeight: '100',
  },
});
