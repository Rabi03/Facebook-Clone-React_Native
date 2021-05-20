import React, { useState } from 'react';
import {
  NavigationContainer,
  useIsFocused,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import HomeScreen from './Screens/HomeTab/HomeScreen';
import FriendScreen from './Screens/FriendTab/FriendScreen';
import MessageScreen from './Screens/MessageTab/MessageScreen';
import WatchScreen from './Screens/WatchTab/WatchScreen';
import NotificationScreen from './Screens/NotificationTab/NotificationScreen';
import ShortCutScreen from './Screens/ShortCutTab/ShortCutScreen';
import {
  FullPostTool,
  CheckIn,
  PhotoUploader,
  LiveStream,
} from './Screens/PostTools/PostTools';
import IconBadge from 'react-native-icon-badge';
import ChatMessages from './Screens/MessageTab/ChatSystem/ChatMessages';
import Comments from './Screens/HomeTab/RecommendFriends/Comments/Comments';
import CommentsPopUp from './Screens/HomeTab/RecommendFriends/Comments/CommentsPopUp';
import PostDetail from './Screens/HomeTab/PostTool/PostDetail';
import PostOptions from './Screens/HomeTab/PostTool/PostOptions';
import ProfileX from './Screens/ProfileTab/ProfileX';
import FullFriends from './Screens/ProfileTab/FullFriends';
import FriendOptions from './Screens/ProfileTab/FriendOptions';
import FindFriends from './Screens/ProfileTab/FindFriends';
import FriendRequests from './Screens/ProfileTab/FriendRequests';
import StoryDetail from './Screens/HomeTab/Stories/Story/StoryDetail';
import GroupCategories from './Screens/FriendTab/GroupProfile/GroupCategories';
import GroupSearch from './Screens/FriendTab/GroupProfile/GroupSearch';
import GroupProfile from './Screens/FriendTab/GroupProfile/GroupProfile';
import WatchSearch from './Screens/WatchTab/WatchSearch';
import WatchDetail from './Screens/WatchTab/WatchList/WatchDetail';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();

const navigationRef = React.createRef();

const STATUSBAR_HEIGHT = getStatusBarHeight();

const homeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerShown: false,
        gestureResponseDistance: { vertical: 800 },
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen
        options={{
          cardStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
          headerShown: false,
        }}
        name='PostOptions'
        component={PostOptions}
      />
    </Stack.Navigator>
  );
};

const friendTab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Group' component={FriendScreen} />
    </Stack.Navigator>
  );
};

const messageTab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Message' component={MessageScreen} />
    </Stack.Navigator>
  );
};
const WatchScreenWithIsFocused = (props) => {
  const isFocused = useIsFocused();
  return <WatchScreen {...props} isFocused={isFocused}></WatchScreen>;
};
const watchTab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Watch' component={WatchScreenWithIsFocused} />
    </Stack.Navigator>
  );
};
const notificationTab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Notification' component={NotificationScreen} />
    </Stack.Navigator>
  );
};
const shortCutTab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ShortCutIndex' component={ShortCutScreen} />
    </Stack.Navigator>
  );
};
const MainTab = () => {
  // const state = useNavigationState((state) => state);
  // let cur_index = state.routeNames[state.index];
  const navigationOptions = {
    showIcon: true,
    showLabel: false,
  };
  return (
    <Tab.Navigator swipeEnabled={false} tabBarOptions={navigationOptions}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <IconBadge
              MainElement={
                <Icon
                  name='home'
                  size={23}
                  color={focused ? '#318bfb' : '#ddd'}
                ></Icon>
              }
              BadgeElement={<Text style={{ color: '#FFFFFF' }}>2</Text>}
              IconBadgeStyle={{
                width: 25,
                height: 25,
                backgroundColor: '#FF0000',
                top: -10,
                right: -10,
              }}
            />
          ),
        }}
        name='Home'
        component={homeTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='user-friends'
              size={21}
              color={focused ? '#318bfb' : '#ddd'}
            ></Icon>
          ),
        }}
        name='Friend'
        component={friendTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <IconBadge
              MainElement={
                <Icon
                  name='facebook-messenger'
                  size={23}
                  color={focused ? '#318bfb' : '#ddd'}
                ></Icon>
              }
              BadgeElement={<Text style={{ color: '#FFFFFF' }}>3</Text>}
              IconBadgeStyle={{
                width: 25,
                height: 25,
                backgroundColor: '#FF0000',
                top: -10,
                right: -10,
              }}
            />
          ),
        }}
        name='Message'
        component={messageTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='video'
              size={23}
              color={focused ? '#318bfb' : '#ddd'}
            ></Icon>
          ),
        }}
        name='Watch'
        component={watchTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='bell'
              size={23}
              color={focused ? '#318bfb' : '#ddd'}
            ></Icon>
          ),
        }}
        name='Notification'
        component={notificationTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='bars'
              size={23}
              color={focused ? '#318bfb' : '#ddd'}
            ></Icon>
          ),
        }}
        name='ShortCut'
        component={shortCutTab}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [index, setIndex] = useState(0);
  const navigate = (name, params) => {
    navigationRef.current?.navigate(name, params);
  };
  const TransitionPreset =
    Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {};
  const navigationOptions = {
    ...TransitionPreset,
    headerShown: true,
    header: (props) => (
      <View
        {...props}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: '#fff',
          paddingTop: 25,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 30, color: '#0000ff', fontWeight: 'bold' }}>
          facebook
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigate('ProfileX', { userId: 1 })}>
            <Icon
              name='user'
              style={{
                color: '#000',
                padding: 10,
                borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,.2)',
                fontSize: 15,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() => navigate('FindFriends', { friends: [] })}
          >
            <Icon
              name='search'
              style={{
                color: '#000',
                padding: 10,
                borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,.2)',
                fontSize: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    ),
    gestureResponseDistance: {
      vertical: 800,
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        setIndex(state.routes[0].state.index);
      }}
    >
      <rootStack.Navigator screenOptions={navigationOptions}>
        <rootStack.Screen component={MainTab} name='MainTab' />
        <rootStack.Screen
          options={{ gestureEnabled: false, headerShown: false }}
          name='FullPostTool'
          component={FullPostTool}
        />
        <rootStack.Screen
          options={{ gestureEnabled: false, headerShown: false }}
          name='PostDetail'
          component={PostDetail}
        />
        <rootStack.Screen
          options={{ gestureEnabled: false, headerShown: false }}
          name='StoryDetail'
          component={StoryDetail}
        />
        <rootStack.Screen
          options={{ gestureEnabled: false, headerShown: false }}
          name='ProfileX'
          component={ProfileX}
        />
        <rootStack.Screen
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
          name='WatchSearch'
          component={WatchSearch}
        />
        <rootStack.Screen
          options={{ gestureEnabled: false, headerShown: false }}
          name='WatchDetail'
          component={WatchDetail}
        />
        <rootStack.Screen
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
          name='GroupCategories'
          component={GroupCategories}
        />
        <rootStack.Screen
          options={{ gestureEnabled: false, headerShown: false }}
          name='GroupSearch'
          component={GroupSearch}
        />
        <rootStack.Screen
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
          name='GroupProfile'
          component={GroupProfile}
        />

        <rootStack.Screen
          options={{ gestureEnabled: false, headerShown: false }}
          name='ChatMessages'
          component={ChatMessages}
        />
        <rootStack.Screen name='CheckIn' component={CheckIn} />
        <rootStack.Screen name='PhotoUploader' component={PhotoUploader} />
        <rootStack.Screen name='LiveStream' component={LiveStream} />

        <rootStack.Screen
          options={{
            gestureEnabled: false,
            cardStyle: { backgroundColor: 'transparent' },
            headerShown: false,
          }}
          name='Comments'
          component={Comments}
        />
        <rootStack.Screen
          options={{
            cardStyle: { backgroundColor: 'transparent' },
            headerShown: false,
          }}
          name='CommentsPopUp'
          component={CommentsPopUp}
        />
        <rootStack.Screen
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
          name='FullFriends'
          component={FullFriends}
        />
        <rootStack.Screen
          options={{
            cardStyle: { backgroundColor: 'transparent' },
            headerShown: false,
          }}
          name='FriendOptions'
          component={FriendOptions}
        />
        <rootStack.Screen
          options={{
            gestureEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
          name='FindFriends'
          component={FindFriends}
        />
        <rootStack.Screen
          options={{ gestureEnabled: false, headerShown: false }}
          name='FriendRequests'
          component={FriendRequests}
        />
      </rootStack.Navigator>
    </NavigationContainer>
  );
}
