import React from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Switch,
  Thumbnail,
  Badge,
} from 'native-base';

import * as data from '../../DB/db.json';
import { View, Image } from 'react-native';

export default function ShortCutScreen({ navigation }) {
  const seeProfile = () => {
    navigation.navigate('ProfileX', {
      userId: 0,
    });
  };
  const seeMessenger = () => {
    navigation.navigate('Message');
  };
  const seeGroups = () => {
    navigation.navigate('Group');
  };
  const seeFriends = () => {
    navigation.navigate('FindFriends', {
      friends: data.users[0].friends,
    });
  };
  const seeVideos = () => {
    navigation.navigate('Watch');
  };
  return (
    <Container>
      <Content>
        <ListItem
          avatar
          onPress={seeProfile}
          noBorder
          style={{ marginBottom: 20 }}
        >
          <Left>
            <Thumbnail
              source={{
                uri: 'https://scontent.fdac17-1.fna.fbcdn.net/v/t1.6435-9/122594012_1015598028852771_8423319275610753691_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zwi5eN4pgEcAX9w3jtS&_nc_ht=scontent.fdac17-1.fna&oh=2d2ca798ca6aaf79ec3fd2d4b239677a&oe=60CA0C6A',
              }}
            />
          </Left>
          <Body>
            <Text>Rabi Islam</Text>
            <Text note>See your Profile</Text>
          </Body>
        </ListItem>
        <ListItem icon noBorder style={{ marginBottom: 10 }}>
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/color/48/000000/live-video-on.png',
              }}
            />
          </Left>
          <Body>
            <Text>Live Videos</Text>
          </Body>
          <Right>
            <Badge>
              <Text>6</Text>
            </Badge>
          </Right>
        </ListItem>
        <ListItem
          icon
          noBorder
          style={{ marginBottom: 10 }}
          onPress={seeMessenger}
        >
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/fluent/48/000000/facebook-messenger--v2.png',
              }}
            />
          </Left>
          <Body>
            <Text>Messenger</Text>
          </Body>
          <Right>
            <Badge>
              <Text>3</Text>
            </Badge>
          </Right>
        </ListItem>
        <ListItem
          icon
          noBorder
          style={{ marginBottom: 10 }}
          onPress={seeGroups}
        >
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/color/48/000000/user-group-skin-type-7.png',
              }}
            />
          </Left>
          <Body>
            <Text>Groups</Text>
          </Body>
        </ListItem>
        <ListItem
          icon
          noBorder
          style={{ marginBottom: 10 }}
          onPress={seeFriends}
        >
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/fluent/48/000000/add-user-group-man-man.png',
              }}
            />
          </Left>
          <Body>
            <Text>Friends</Text>
          </Body>
        </ListItem>
        <ListItem
          icon
          noBorder
          style={{ marginBottom: 10 }}
          onPress={seeVideos}
        >
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/fluent/48/000000/video-call.png',
              }}
            />
          </Left>
          <Body>
            <Text>Videos</Text>
          </Body>
          <Right>
            <Badge>
              <Text>4</Text>
            </Badge>
          </Right>
        </ListItem>
        <ListItem icon noBorder style={{ marginBottom: 10 }}>
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/fluent/48/000000/stall.png',
              }}
            />
          </Left>
          <Body>
            <Text>Marketplace</Text>
          </Body>
        </ListItem>
        <ListItem icon noBorder style={{ marginBottom: 10 }}>
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/color/48/000000/flag.png',
              }}
            />
          </Left>
          <Body>
            <Text>pages</Text>
          </Body>
        </ListItem>
        <ListItem icon noBorder style={{ marginBottom: 10 }}>
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/fluent/48/000000/save-all.png',
              }}
            />
          </Left>
          <Body>
            <Text>Saved</Text>
          </Body>
        </ListItem>
        <ListItem icon noBorder style={{ marginBottom: 10 }}>
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/fluent/48/000000/event-accepted-tentatively.png',
              }}
            />
          </Left>
          <Body>
            <Text>Events</Text>
          </Body>
        </ListItem>
        <ListItem icon noBorder style={{ marginBottom: 10 }}>
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/color/48/000000/settings.png',
              }}
            />
          </Left>
          <Body>
            <Text>Settings</Text>
          </Body>
        </ListItem>
        <ListItem icon noBorder style={{ marginBottom: 10 }}>
          <Left>
            <Thumbnail
              small
              square
              source={{
                uri: 'https://img.icons8.com/color/48/000000/in-app-messaging.png',
              }}
            />
          </Left>
          <Body>
            <Text>Log Out</Text>
          </Body>
        </ListItem>
      </Content>
    </Container>
  );
}
