import Clipboard from '@react-native-community/clipboard';
import React, { Component, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Toast from 'react-native-root-toast';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function FriendOptions({ navigation, route }) {
  const [isVisible, setisVisible] = useState(false);
  const onPressCopyPostLinkHandler = () => {
    const { friend } = route.params;
    setTimeout(() => {
      setisVisible(false);
    }, 2000);
    Clipboard.setString(`https://fakebook.com/posts/${friend.id}`);
    setisVisible(true);
  };
  const onPressBackdropHandler = () => {
    navigation.goBack();
  };
  const { friend } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='bookmark' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>View user's friends</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon
                name='minus-square'
                size={24}
              ></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>Send message</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='globe-asia' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>Unfollow</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='trash-alt' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>Block</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='history' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>Remove in friends list</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '55%',
    width: '100%',
    position: 'relative',
  },
  backdrop: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  postOptionsWrapper: {
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  postOptionItemWrapper: {
    paddingBottom: 20,
  },
  postOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 35,
    alignItems: 'center',
  },
  postOptionTitle: {
    fontSize: 16,
  },
  postOptionSubtitle: {
    fontSize: 12,
  },
});
