import React, { useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUSBAR_HEIGHT,
} from '../../constants/constants';
import * as data from '../../DB/db.json';
import PostOptions from '../HomeTab/PostTool/PostOptions';
import FriendOptions from './FriendOptions';

export default function FullFriends({ navigation }) {
  const [filterType, setfilterType] = useState(1);
  const [visible, setVisible] = useState(false);
  const [friend, setfriend] = useState({});
  const [keyword, setkeyword] = useState('');
  const _horizontalScrollRef = useRef();
  let _currentTab = 1;
  const onPressGoBackHandler = () => {
    navigation.goBack();
  };
  const onPressToggleFilter = () => {
    if (filterType === 1)
      _horizontalScrollRef.current.scrollToEnd({ animated: true });
    else
      _horizontalScrollRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    setfilterType((filterType) => (filterType === 1 ? 2 : 1));
  };
  const onChangeSearchInputHandler = ({ nativeEvent }) => {
    const textValue = nativeEvent.text.toLowerCase();
    setkeyword(textValue);
  };
  const onScrollToActChangeTab = ({ nativeEvent }) => {
    const offsetX = nativeEvent.contentOffset.x;
    if (offsetX > SCREEN_WIDTH / 2) {
      _horizontalScrollRef.current.scrollToEnd({ animated: true });
      setfilterType(2);
    } else {
      _horizontalScrollRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
        duration: 100,
      });
      setfilterType(1);
    }
  };
  const onPressFriendOptionsHandler = (friend) => {
    setVisible(!visible);
    setfriend(friend);
    // navigation.navigate('FriendOptions', {
    //   friend,
    // });
  };
  const onPressProfileHandler = (userId) => {
    navigation.push('ProfileX', {
      userId,
    });
  };
  const onPressSearchHandler = () => {};
  const friends = data.users;
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={onPressGoBackHandler} style={styles.btnBack}>
          <FontAwesome5Icon name='arrow-left' color='#000' size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSearchHandler} style={styles.btnBack}>
          <FontAwesome5Icon name='search' color='#000' size={20} />
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.searchToolWrapper}>
          <View style={styles.filterWrapper}>
            <TouchableOpacity
              onPress={onPressToggleFilter.bind(this)}
              activeOpacity={0.6}
              style={{
                ...styles.btnFilter,
                backgroundColor: filterType === 1 ? '#9dd0eb' : '#ddd',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: filterType === 1 ? '#318bfb' : '#000',
                }}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressToggleFilter.bind(this)}
              activeOpacity={0.6}
              style={{
                ...styles.btnFilter,
                marginLeft: 10,
                backgroundColor: filterType === 2 ? '#9dd0eb' : '#ddd',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: filterType === 2 ? '#318bfb' : '#000',
                }}
              >
                Recent
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchTool}>
            <View style={styles.btnSearchIcon}>
              <FontAwesome5Icon name='search' color='gray' size={16} />
            </View>
            <TextInput
              onChange={onChangeSearchInputHandler.bind(this)}
              style={styles.searchInput}
              placeholder='Search Friends'
            ></TextInput>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView
        ref={_horizontalScrollRef}
        onScrollEndDrag={onScrollToActChangeTab.bind(this)}
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView
          style={styles.friendsWrapper}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.friendsCount}>{friends.length} Friends</Text>
          <View style={styles.friends}>
            {friends.map((friend, index) => (
              <View key={index}>
                {friend.name.indexOf(keyword) > -1 ? (
                  <TouchableOpacity
                    onPress={onPressProfileHandler.bind(this, friend.id)}
                    key={index}
                    style={styles.friendItem}
                  >
                    <Image
                      source={{ uri: friend.avatar_url }}
                      style={styles.friendAvatar}
                    />
                    <View style={styles.friendInfoWrapper}>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <Text style={styles.friendMutualCount}>
                        {friend.friends.length} mutual friends
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={onPressFriendOptionsHandler.bind(this, friend)}
                      style={styles.btnFriendOptions}
                    >
                      <FontAwesome5Icon name='ellipsis-h' size={20} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
        <ScrollView
          style={styles.friendsWrapper}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.friends}>
            {friends.map((friend, index) => (
              <View key={index}>
                {friend.name.indexOf(keyword) > -1 ? (
                  <TouchableOpacity key={index} style={styles.friendItem}>
                    <Image
                      source={{ uri: friend.avatar_url }}
                      style={styles.friendAvatar}
                    />
                    <View style={styles.friendInfoWrapper}>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <Text style={styles.friendMutualCount}>
                        {friend.friends.length} mutual friends
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.btnFriendOptions}>
                      <FontAwesome5Icon name='ellipsis-h' size={20} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      {visible && (
        <FriendOptions navigation={{ navigation }} route={{ params: friend }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  navigationBar: {
    paddingTop: STATUSBAR_HEIGHT,
    flexDirection: 'row',
    height: 94,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  btnBack: {
    width: 50,
    alignItems: 'center',
  },
  navigationTitle: {
    fontSize: 18,
  },
  searchToolWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  filterWrapper: {
    flexDirection: 'row',
  },
  btnFilter: {
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
  },
  btnFilterActived: {
    backgroundColor: '#9dd0eb',
  },
  searchTool: {
    flexDirection: 'row',
    marginTop: 10,
    overflow: 'hidden',
    borderRadius: 50,
  },
  btnSearchIcon: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: 40,
  },
  searchInput: {
    height: 40,
    width: SCREEN_WIDTH - 30 - 40,
    backgroundColor: '#ddd',
    paddingRight: 30,
  },
  friendsWrapper: {
    padding: 15,
    paddingTop: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 50) - 120,
  },
  friendsCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friends: {},
  friendItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  friendAvatar: {
    height: 80,
    width: 80,
    borderRadius: 80,
    borderColor: '#333',
    borderWidth: 0.2,
  },
  friendInfoWrapper: {
    width: SCREEN_WIDTH - 30 - 80 - 30,
    paddingLeft: 15,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
  },
  friendMutualCount: {
    color: '#333',
  },
  btnFriendOptions: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
