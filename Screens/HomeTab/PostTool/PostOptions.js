import React, { Component, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-root-toast';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function PostOptions({ navigation, route }) {
  const [isVisible, setisVisible] = useState(false);
  const onPressCopyPostLinkHandler = () => {
    const { postDetail } = route.params;
    setTimeout(() => {
      setisVisible(false);
    }, 2000);
    Clipboard.setString(`https://facebook.com/posts/${postDetail.id}`);
    setisVisible(true);
  };
  const onPressBackdropHandler = () => {
    navigation.navigate('Home');
  };
  const { postDetail } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='bookmark' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>Book mark this post</Text>
              <Text style={styles.postOptionSubtitle}>Add to saved list</Text>
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
              <Text style={styles.postOptionTitle}>Hide this post</Text>
              <Text style={styles.postOptionSubtitle}>Hide similar posts</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='clock' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>
                Temporarily hide {postDetail.user.name} for 30 days
              </Text>
              <Text style={styles.postOptionSubtitle}>
                Temporarily stop viewing posts
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='user-times' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>
                Unfollow {postDetail.user.name}
              </Text>
              <Text style={styles.postOptionSubtitle}>
                Don't want to see {postDetail.user.name}'s posts
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon
                name='exclamation-circle'
                size={24}
              ></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>
                Why do I see this post ?
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon
                name='exclamation-triangle'
                size={24}
              ></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>Report this post</Text>
              <Text style={styles.postOptionSubtitle}>
                I'm worry about this post
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='history' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>
                See edited content history
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='bell' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>
                Turn on the notification about this post
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressCopyPostLinkHandler.bind(this)}
          style={styles.postOptionItemWrapper}
        >
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <FontAwesome5Icon name='clone' size={24}></FontAwesome5Icon>
            </View>
            <View>
              <Text style={styles.postOptionTitle}>Copy post's link</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Toast
        visible={isVisible}
        position={Toast.positions.BOTTOM}
        shadow={false}
        animation={false}
        hideOnPress={true}
      >
        Copied to clipboard
      </Toast>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  backdrop: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  postOptionsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    padding: 15,
    backgroundColor: '#fff',
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
