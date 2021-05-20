import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import * as data from '../../DB/db.json';
import PostTool from './PostTool/PostTool';
import Stories from './Stories/Stories';
import RecommendFriends from './RecommendFriends/RecommendFriends';
import Item from './PostItem';

export default function HomeScreen({ navigation }) {
  const posts = data.posts;
  return (
    <View>
      <ScrollView bounces={false} style={styles.Containter}>
        <PostTool navigation={navigation}></PostTool>
        <Stories navigation={navigation} />
        {posts.map((item, index) => (
          <View key={index}>
            {index === 1 && (
              <RecommendFriends navigation={navigation}></RecommendFriends>
            )}
            <Item item={item} key={index} navigation={navigation}></Item>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countTxt: {
    fontSize: 200,
    textAlign: 'center',
    lineHeight: screenHeight - 170,
    width: '100%',
    height: screenHeight - 170,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
  },
});
