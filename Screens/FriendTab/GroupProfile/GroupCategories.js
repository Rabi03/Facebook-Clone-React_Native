import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import GroupCategoryItem from './GroupCategoryItem';
import * as data from '../../../DB/db.json';

export default function GroupCategories({ navigation }) {
  const groupCategories = data.group_categories;
  return (
    <ScrollView style={styles.container} bounces={false}>
      {groupCategories.map((category, index) => (
        <View key={index}>
          {category.isPopular && (
            <GroupCategoryItem
              category={category}
              key={index}
              navigation={navigation}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.2,
  },
});
