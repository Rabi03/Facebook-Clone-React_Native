import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUSBAR_HEIGHT,
} from '../../constants/constants';
import * as data from '../../DB/db.json';

export default function FriendRequests({ navigation }) {
  const onPressRemoveFriendRequest = (index) => {};
  const onPressProfileHandler = (userId) => {
    navigation.push('ProfileX', {
      userId,
    });
  };
  const onPressGoBackHandler = () => {
    navigation.goBack();
  };
  let friendRequests = data.friend_requests;
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={onPressGoBackHandler} style={styles.btnBack}>
          <FontAwesome5Icon name='arrow-left' size={20} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.searchInput}>
          <FontAwesome5Icon name='search' size={16} color='gray' />
          <Text style={{ color: 'gray', marginLeft: 10, fontSize: 16 }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.friendRequestsWrapper}>
          <Text style={styles.friendRequestsTitle}>Friend Requests</Text>
          <View style={styles.friendRequests}>
            {friendRequests.map((friendRequest, index) => (
              <TouchableOpacity
                onPress={onPressProfileHandler.bind(this, friendRequest.userId)}
                key={index}
                style={styles.recommendFriendItem}
              >
                <Image
                  style={styles.avatar}
                  source={{ uri: data.users[friendRequest.userId].avatar_url }}
                />
                <View style={styles.recommendInfo}>
                  <Text style={styles.name}>
                    {data.users[friendRequest.userId].name}
                  </Text>
                  <Text style={styles.mutualCount}>
                    {friendRequest.mutualCount} mutual friends
                  </Text>
                  <View style={styles.btnActionsWrapper}>
                    <TouchableOpacity style={styles.btnAddFriend}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '500',
                          fontSize: 16,
                        }}
                      >
                        Confirm
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onPressRemoveFriendRequest.bind(this, index)}
                      style={styles.btnHide}
                    >
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '500',
                          fontSize: 16,
                        }}
                      >
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  navigationBar: {
    flexDirection: 'row',
    paddingTop: STATUSBAR_HEIGHT,
    height: 94,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  btnBack: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    width: SCREEN_WIDTH - 40 - 15,
    height: 36,
    borderRadius: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  btnNavigationsWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 15,
  },
  btnNavigation: {
    height: 36,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  scrollContainer: {
    paddingHorizontal: 15,
    height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 50),
  },
  friendRequestsWrapper: {
    paddingVertical: 15,
  },
  friendRequestsTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  friendRequests: {
    paddingVertical: 7.5,
  },
  recommendFriendItem: {
    flexDirection: 'row',
    marginVertical: 7.5,
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  recommendInfo: {
    width: SCREEN_WIDTH - 30 - 100,
    paddingLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  mutualCount: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  btnActionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnAddFriend: {
    width: '48.5%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#318bfb',
    borderRadius: 5,
  },
  btnHide: {
    width: '48.5%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
});
