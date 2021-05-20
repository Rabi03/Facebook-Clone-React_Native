import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as data from '../../DB/db.json';

export default function FriendsShowing({
  navigation,
  friends,
  userXId,
  isUserX,
}) {
  const onPressViewAllFriendsHandler = () => {
    navigation.navigate('FullFriends', {
      friends,
    });
  };
  const onPressProfileHandler = (userId) => {
    if (user.id === userId) return navigation.navigate('Home');
    navigation.navigate('ProfileX', {
      userId,
    });
  };
  const onPressFindFriendsHandler = () => {
    navigation.navigate('FindFriends', {
      friends,
    });
  };
  let mututalCount;
  if (isUserX) {
    mututalCount =
      friends.filter((friend) => friend.id === userXId)[0]?.mutualFriends || 0;
  }
  return (
    <View style={styles.friendsWrapper}>
      <View style={{ backgroundColor: '#000', borderRadius: 5 }}>
        <TouchableOpacity
          onPress={onPressViewAllFriendsHandler.bind(this)}
          activeOpacity={0.8}
          style={styles.friendsBar}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Friends</Text>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>
              {friends.length} friends
              {(isUserX === true) & (mututalCount > 0)
                ? `(${mututalCount} mutual friends)`
                : ''}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onPressFindFriendsHandler}
            activeOpacity={0.8}
            style={styles.btnFindFriends}
          >
            <Text style={{ fontSize: 16, color: '#318bfb' }}>Find friends</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.friendGallery}>
        {friends.splice(0, 6).map((friend, index) => (
          <View key={index} style={styles.friendItem}>
            <TouchableOpacity
              onPress={onPressProfileHandler.bind(this, friend.userId)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: data.users[friend.userId].avatar_url }}
                style={styles.friendAvatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressProfileHandler.bind(this, friend.userId)}
              style={{ marginTop: 5 }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                {friend.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={onPressViewAllFriendsHandler.bind(this)}
        activeOpacity={0.8}
        style={styles.btnViewAllFriends}
      >
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
          View all friends
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  friendsWrapper: {
    paddingVertical: 15,
  },
  friendsBar: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnFindFriends: {
    paddingHorizontal: 11,
  },
  friendGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  friendItem: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    marginBottom: 15,
  },
  friendAvatar: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    height: (SCREEN_WIDTH - 30 - 20) / 3,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#333',
  },
  btnViewAllFriends: {
    width: '100%',
    borderRadius: 5,
    height: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
