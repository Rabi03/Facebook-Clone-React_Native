import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Story from './Story/Story';
import StoryAdder from './Story/StoryAdder';

import * as data from '../../../DB/db.json';

export default function Stories({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.stories}
        horizontal={true}
      >
        <StoryAdder></StoryAdder>
        {data.stories.map((story, index) => (
          <Story
            position={index}
            key={index}
            story={story}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
  },
  stories: {
    flexWrap: 'nowrap',
  },
});
