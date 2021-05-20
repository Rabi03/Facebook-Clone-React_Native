import React, { Component, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants/constants';
import VideoPlayer from './VideoPlayer';
import * as data from '../../../DB/db.json';

export default function WatchDetail({ navigation, route }) {
  let _videoRef = useRef();
  let _infoOpacity = new Animated.Value(1);
  let _isLiked = false;
  let _isCalledGoBack = false;
  let _isShowInfo = true;
  const onPressCommentsHandler = () => {
    const { comments } = data.watch_videos[route.params.id];
    navigation.navigate('CommentsPopUp', {
      comments,
    });
  };
  const onPressHideDetailWrapperHandler = () => {
    if (_isShowInfo) {
      _isShowInfo = false;
      _infoOpacity.setValue(0);
    } else {
      _isShowInfo = true;
      _infoOpacity.setValue(1);
    }
  };
  const onShowControllerHandler = () => {
    _infoOpacity.setValue(1);
    _isShowInfo = true;
  };
  const onHideControllerHandler = () => {
    _infoOpacity.setValue(0);
    _isShowInfo = false;
  };
  const onFinishHandler = () => {
    if (!_isCalledGoBack) {
      navigation.goBack();
      _isCalledGoBack = true;
    }
  };
  const onPauseHandler = () => {};
  const onPlayHandler = () => {};

  const watchingVideo = data.watch_videos[route.params.id];
  let reactionValue = 0;
  for (let emoji in watchingVideo.reactions) {
    reactionValue += watchingVideo.reactions[emoji];
  }
  return (
    <TouchableWithoutFeedback
      onPress={onPressHideDetailWrapperHandler.bind(this)}
    >
      <View style={styles.postWrapper}>
        <View style={{ ...styles.postContentWrapper }}>
          <Animated.View
            style={{ ...styles.infoWrapper, opacity: _infoOpacity }}
          >
            <View style={styles.listItemInfoWrapper}>
              <View style={styles.listItemInfo}>
                <Image
                  style={styles.avatar}
                  source={{ uri: data.pages[watchingVideo.pageId].avatar_url }}
                ></Image>
                <View>
                  <TouchableOpacity>
                    <Text style={styles.name}>
                      {data.pages[watchingVideo.pageId].name}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.time}>{watchingVideo.create_at}</Text>
                </View>
              </View>
              {!watchingVideo.isFollowed && (
                <TouchableOpacity style={styles.btnFollow}>
                  <Text style={{ color: 'rgba(255,255,255,0.8)' }}>FOLLOW</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.content}>{watchingVideo.content}</Text>
          </Animated.View>
          <VideoPlayer
            videoId={watchingVideo.id}
            onShowController={onShowControllerHandler.bind(this)}
            onHideController={onHideControllerHandler.bind(this)}
            isAutoToggleController={true}
            shouldPlay={true}
            source={{ uri: watchingVideo.video.video_url }}
            onPause={onPauseHandler.bind(this)}
            onPlay={onPlayHandler.bind(this)}
            onFinish={onFinishHandler.bind(this)}
            isCenterVertical={true}
            containerStyle={{}}
            watchingVideo={watchingVideo}
            showController={true}
          />
          <Animated.View
            style={{ ...styles.reactionsWrapper, opacity: _infoOpacity }}
          >
            <View horizontal={true} style={styles.reactionContainer}>
              {watchingVideo.reactions.like && (
                <TouchableOpacity>
                  <Icon
                    name='thumbs-up'
                    color='#318bfb'
                    backgroundColor='#318bfb'
                    style={{ fontSize: 20 }}
                  ></Icon>
                </TouchableOpacity>
              )}

              {watchingVideo.reactions.love && (
                <TouchableOpacity>
                  <Icon
                    name='heart'
                    color='#e8304a'
                    backgroundColor='#e8304a'
                    style={{ fontSize: 20 }}
                  ></Icon>
                </TouchableOpacity>
              )}

              {watchingVideo.reactions.haha && (
                <TouchableOpacity>
                  <Icon
                    name='grin-squint'
                    color='#f7ca51'
                    backgroundColor='white'
                    style={{ fontSize: 20 }}
                  ></Icon>
                </TouchableOpacity>
              )}

              {watchingVideo.reactions.surprise && (
                <TouchableOpacity>
                  <Icon
                    name='surprise'
                    color='#f7ca51'
                    backgroundColor='white'
                    style={{ fontSize: 20 }}
                  ></Icon>
                </TouchableOpacity>
              )}

              {watchingVideo.reactions.angry && (
                <TouchableOpacity>
                  <Icon
                    lineBreakMode={false}
                    name='angry'
                    color='#dc4311'
                    backgroundColor='white'
                    style={{ fontSize: 20 }}
                  ></Icon>
                </TouchableOpacity>
              )}
              <Text style={{ marginLeft: 5, fontSize: 18, color: '#fff' }}>
                {reactionValue}
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
                  color='#fff'
                  style={{ fontSize: 25, marginRight: 4 }}
                ></Icon>
                <Text style={{ fontSize: 20, color: '#fff' }}>
                  {reactionValue}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.postIcon }}
                onPress={onPressCommentsHandler.bind(this)}
              >
                <Icon
                  lineBreakMode={false}
                  name='comment-alt'
                  color='#fff'
                  style={{ fontSize: 25, marginRight: 4 }}
                ></Icon>
                <Text style={{ fontSize: 20, marginTop: -2, color: '#fff' }}>
                  {watchingVideo.comments.length}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.postIcon }}>
                <Text>
                  <Icon
                    lineBreakMode={false}
                    name='share'
                    color='#fff'
                    style={{ fontSize: 25 }}
                  ></Icon>
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  reactionContainer: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  reactionIcon: {
    fontSize: 20,
    padding: 10,
  },
  postWrapper: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,1)',
    height: SCREEN_HEIGHT,
  },
  postContentWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
  },
  infoWrapper: {
    marginTop: 44 + 50,
    width: '100%',
    paddingHorizontal: 15,
  },
  listItemInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnFollow: {
    height: 30,
    borderRadius: 4,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 0.5,
  },
  listItemInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    color: '#fff',
  },
  time: {
    marginTop: 5,
    color: '#fff',
    fontSize: 12,
    textTransform: 'uppercase',
    opacity: 0.5,
  },

  btnControlWrapper: {
    alignItems: 'center',
  },
  reactionsWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: '100%',
  },
  btnReactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  reactionBtnText: {
    color: '#fff',
    marginLeft: 5,
  },
  btnWrapper: {
    flex: 1,
  },
  reactionBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    position: 'absolute',
    left: 0,
  },
  video: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  reactionValueWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  reactionNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBack: {
    width: 30,
    height: 30,
    color: '#fff',
  },
  postIcon: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#000',
    fontSize: 18,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
