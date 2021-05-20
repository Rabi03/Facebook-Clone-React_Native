import React, { useState } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GroupPostTool from '../../PostTools/GroupPostTool';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUSBAR_HEIGHT,
} from '../../../constants/constants';
import GroupPosts from '../FriendPosts/FriendPosts';
import * as data from '../../../DB/db.json';
export default function GroupProfile({ navigation, route }) {
  const [isScrollOverLimit, setisScrollOverLimit] = useState(false);
  let _groupTitleOpacity = new Animated.Value(0);

  const onPressGoBackHandler = () => {
    navigation.goBack();
  };
  const onScrollHandler = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    const limit = 250 - (STATUSBAR_HEIGHT + 50);
    if (offsetY > limit && isScrollOverLimit !== true) {
      Animated.timing(_groupTitleOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setisScrollOverLimit(true);
    }
    if (offsetY < limit && isScrollOverLimit !== false) {
      Animated.timing(_groupTitleOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setisScrollOverLimit(false);
    }
  };
  const groupTitleOpacity = _groupTitleOpacity;
  const groupDetail = data.groups[route.params.id];
  const friendsInGroup = groupDetail.friendsInGroup;
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.searchToolWrapper,
          backgroundColor: isScrollOverLimit ? '#fff' : 'rgba(0,0,0,0)',
          borderBottomColor: isScrollOverLimit ? '#ddd' : 'rgba(0,0,0,0)',
        }}
      >
        <TouchableOpacity style={{ width: 20 }} onPress={onPressGoBackHandler}>
          <FontAwesome5Icon
            size={20}
            color={isScrollOverLimit ? '#333' : '#fff'}
            name='arrow-left'
          ></FontAwesome5Icon>
        </TouchableOpacity>
        <Animated.View
          style={{ ...styles.groupTitle, opacity: groupTitleOpacity }}
        >
          <Image
            style={{ ...styles.groupAvatar }}
            source={{ uri: groupDetail.avatar_url }}
          ></Image>
          <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: '500' }}>
            {groupDetail.name}
          </Text>
        </Animated.View>
        <View style={styles.rightIconsWrapper}>
          <TouchableOpacity>
            <FontAwesome5Icon
              name='search'
              size={20}
              color={isScrollOverLimit ? '#333' : '#fff'}
            ></FontAwesome5Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5Icon
              name='ellipsis-h'
              size={20}
              color={isScrollOverLimit ? '#333' : '#fff'}
            ></FontAwesome5Icon>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={50}
        onScroll={onScrollHandler.bind(this)}
        bounces={false}
      >
        <ImageBackground
          source={{ uri: groupDetail.cover_url }}
          style={styles.cover}
        >
          <View style={styles.darkBox}></View>
        </ImageBackground>
        <View style={styles.introWrapper}>
          <TouchableOpacity>
            <View style={styles.nameWrapper}>
              <Text style={styles.groupName}>{groupDetail.name}</Text>
              <FontAwesome5Icon name='chevron-right'></FontAwesome5Icon>
            </View>
            <Text style={{ color: 'gray' }}>
              {groupDetail.isPublic ? 'PUBLIC GROUP' : 'PRIVATE GROUP'} -{' '}
              {groupDetail.member} MEMBERS
            </Text>
          </TouchableOpacity>
          <View style={styles.friendsInGroup}>
            <TouchableOpacity style={styles.friendAvatarsWrapper}>
              {friendsInGroup.map((friend, index) => (
                <ImageBackground
                  key={index}
                  source={{ uri: data.users[friend.userId].avatar_url }}
                  style={{
                    ...styles.friendAvatar,
                    marginLeft: index > 0 ? -10 : 0,
                    zIndex: friendsInGroup.length - index,
                  }}
                >
                  {index === friendsInGroup.length - 1 && (
                    <View style={styles.btnMoreMembers}>
                      <FontAwesome5Icon
                        name='ellipsis-h'
                        size={16}
                        color='#fff'
                      ></FontAwesome5Icon>
                    </View>
                  )}
                </ImageBackground>
              ))}
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnInvite}>
              <FontAwesome5Icon
                size={16}
                color='#fff'
                name='plus'
              ></FontAwesome5Icon>
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 5,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                Invite
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.navigationsWrapper}
        >
          <TouchableOpacity style={styles.navigation}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Announced</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigation}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              Watch together
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigation}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigation}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigation}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>File</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigation}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Album</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.navigation, marginRight: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Thread</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.postToolWrapper}>
          <GroupPostTool groupDetail={groupDetail} navigation={navigation} />
        </View>
        <GroupPosts isInGroup={true} groupId={groupDetail.id}></GroupPosts>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  searchToolWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    width: '100%',
    height: 94,
    paddingTop: STATUSBAR_HEIGHT,
    left: 0,
    top: 0,
    zIndex: 99,
    borderBottomWidth: 1,
  },
  groupTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    width: SCREEN_WIDTH - 30 - 20 - 70,
  },
  groupAvatar: {
    height: 40,
    width: 40,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#333',
    marginRight: 10,
  },
  rightIconsWrapper: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
  },
  cover: {
    height: 250,
  },
  darkBox: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  introWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupName: {
    marginRight: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  friendsInGroup: {
    marginTop: 15,
    flexDirection: 'row',
  },
  friendAvatarsWrapper: {
    flexDirection: 'row',
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: '#fff',
    borderWidth: 3,
  },
  btnMoreMembers: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnInvite: {
    backgroundColor: '#318bfb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 48,
    borderColor: '#fff',
    borderWidth: 3,
  },
  navigationsWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navigation: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 48,
    marginHorizontal: 5,
  },
  postToolWrapper: {
    marginBottom: 10,
  },
});
