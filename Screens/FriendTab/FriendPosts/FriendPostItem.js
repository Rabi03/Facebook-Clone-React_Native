import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { permission } from '../../../constants/constants';
import ScaledImage from '../../HomeTab/ScaledImage';
import * as data from '../../../DB/db.json';

export default function FriendPostItem({ navigation, item }) {
  const onPressHandle = () => {
    const { comments } = item;
    navigation.navigate('CommentsPopUp', {
      comments,
    });
  };
  const onPressPostOptionsIconHandler = () => {
    navigation.navigate('PostOptions', {
      postDetail: item,
    });
  };
  const onPressGroupNameHandler = () => {
    navigation.navigate('GroupProfile', {
      id: item.group.id,
    });
  };
  const onPressPostImageHandler = (id) => {
    navigation.navigate('PostDetail', {
      id,
    });
  };
  const onPressShareHandler = () => {
    navigation.navigate('SharePost', {
      id: item.id,
    });
  };
  const onPressProfileHandler = (userId) => {
    navigation.push('ProfileX', {
      userId,
    });
  };
  const user = data.users[item.userId];
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.customListView}>
          <Image
            style={styles.avatar}
            source={{ uri: user?.avatar_url }}
          ></Image>
          <View style={styles.infoWrapper}>
            <View style={styles.namesWrapper}>
              <TouchableOpacity
                onPress={onPressProfileHandler.bind(this, item.userId)}
              >
                <Text style={{ fontSize: 16, fontWeight: '500' }}>
                  {user?.name}
                </Text>
              </TouchableOpacity>
              <Text
                style={{ fontSize: 16, fontWeight: '500', marginHorizontal: 5 }}
              >
                ▶
              </Text>
              <TouchableOpacity
                onPress={onPressGroupNameHandler.bind(this)}
                style={{ maxWidth: 150 }}
              >
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={{ fontSize: 16, fontWeight: '500' }}
                >
                  {item.group.name}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.extraInfoWrapper}>
              <Text style={{ color: '#333', fontSize: 14 }}>
                {item.create_at}
              </Text>
              <Text style={{ fontSize: 16, marginHorizontal: 5 }}>·</Text>
              {item.permission == permission.PUBLIC && (
                <FontAwesome5Icon color='#333' name='globe-asia' />
              )}
              {item.permission == permission.SETTING && (
                <FontAwesome5Icon color='#333' name='cogs' />
              )}
              {item.permission == permission.GROUP && (
                <FontAwesome5Icon color='#333' name='newspaper' />
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={onPressPostOptionsIconHandler.bind(this)}
          style={{ width: 25, alignItems: 'center' }}
        >
          <Icon name='ellipsis-h' color='#000'></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>{item.content}</Text>
      </View>
      <TouchableOpacity onPress={onPressPostImageHandler.bind(this, item.id)}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode='contain'
            source={{ uri: item.image }}
            style={{ width: '100%', height: 300 }}
          ></Image>
        </View>
      </TouchableOpacity>
      <View horizontal={true} style={styles.reactionContainer}>
        {item.reactions.like && (
          <TouchableOpacity>
            <Icon
              name='thumbs-up'
              color='#318bfb'
              backgroundColor='#318bfb'
              style={styles.reactionIcon}
            ></Icon>
          </TouchableOpacity>
        )}

        {item.reactions.love && (
          <TouchableOpacity>
            <Icon
              name='heart'
              color='#e8304a'
              backgroundColor='#e8304a'
              style={styles.reactionIcon}
            ></Icon>
          </TouchableOpacity>
        )}

        {item.reactions.haha && (
          <TouchableOpacity>
            <Icon
              name='grin-squint'
              color='#f7ca51'
              backgroundColor='white'
              style={styles.reactionIcon}
            ></Icon>
          </TouchableOpacity>
        )}

        {item.reactions.surprise && (
          <TouchableOpacity>
            <Icon
              name='surprise'
              color='#f7ca51'
              backgroundColor='white'
              style={styles.reactionIcon}
            ></Icon>
          </TouchableOpacity>
        )}

        {item.reactions.angry && (
          <TouchableOpacity>
            <Icon
              lineBreakMode={false}
              name='angry'
              color='#dc4311'
              backgroundColor='white'
              style={styles.reactionIcon}
            ></Icon>
          </TouchableOpacity>
        )}
        <Text style={{ marginLeft: 5, fontSize: 18 }}>
          {item.reactions.total}
        </Text>
      </View>
      <View
        horizontal={true}
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 10,
          marginRight: 10,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity style={{ ...styles.postIcon }}>
          <Icon
            lineBreakMode={false}
            name='thumbs-up'
            color='rgba(0,0,0,0.7)'
            style={{ fontSize: 25, marginRight: 4 }}
          ></Icon>
          <Text style={{ fontSize: 20 }}>{item.reactions.total}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressHandle.bind(this)}
          style={{ ...styles.postIcon }}
        >
          <Icon
            lineBreakMode={false}
            name='comment-alt'
            color='gray'
            style={{ fontSize: 25, marginRight: 4 }}
          ></Icon>
          <Text style={{ fontSize: 20, marginTop: -2 }}>
            {item.comments.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ ...styles.postIcon }}>
            <Icon
              lineBreakMode={false}
              name='share'
              color='gray'
              style={{ fontSize: 25 }}
            ></Icon>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentContainer}>
        <Image
          source={{ uri: user.avatar_url }}
          style={styles.commentAvatar}
        ></Image>
        <View style={styles.commentInput}>
          <TouchableOpacity
            onPress={onPressHandle.bind(this)}
            style={styles.commentInputWrapper}
          >
            <Text>Comment...</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Icon
            style={styles.btnSendComment}
            name='paper-plane'
            color='gray'
          ></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  customListView: {
    padding: 15,
    width: screenWidth - 40,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  infoWrapper: {
    marginLeft: 8,
  },
  namesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    marginBottom: 10,
  },
  commentInputWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  paragraph: {},
  contentContainer: {
    paddingHorizontal: 15,
  },
  imageContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionContainer: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 5,
  },
  reactionIcon: {
    fontSize: 20,
  },
  shareIcon: {
    position: 'absolute',
    fontSize: 14,
    padding: 10,
    right: 0,
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
    borderColor: 'red',
    borderStyle: 'dashed',
    flexWrap: 'nowrap',
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  commentInput: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 20,
    marginLeft: 10,
    height: 30,
    width: screenWidth - 15 * 2 - 60,
  },
  btnSendComment: {
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 20,
    color: '#0000ff',
  },
  postIcon: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    fontSize: 18,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
