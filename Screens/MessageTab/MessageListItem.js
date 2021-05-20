import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  View,
} from 'native-base';
import IconBadge from 'react-native-icon-badge';

export default function MessageListItem({
  image,
  active,
  time,
  name,
  navigation,
}) {
  return (
    <ListItem
      avatar
      noBorder
      onPress={() => navigation.navigate('ChatMessages')}
    >
      <Left>
        <IconBadge
          MainElement={<Thumbnail source={{ uri: image }} />}
          BadgeElement={
            !active ? (
              <Text style={{ color: '#008000' }}>{time}</Text>
            ) : (
              <Icon
                name='primitive-dot'
                style={{ color: '#008000', fontSize: 25 }}
              />
            )
          }
          IconBadgeStyle={{
            width: active ? 20 : 40,
            height: active ? 20 : 30,
            backgroundColor: '#FFFFFF',
            top: 35,
            right: -5,
          }}
        />
      </Left>
      <Body>
        <Text style={{ fontSize: 20, fontWeight: active ? 'bold' : 'normal' }}>
          {name}
        </Text>
        <Text
          style={{
            color: active ? '#000' : 'rgba(0,0,0,0.5)',
            fontWeight: active ? 'bold' : 'normal',
          }}
        >
          Doing what you like will always keep you happy . .
        </Text>
      </Body>
      <Right>
        <Text note>3:43 pm</Text>
      </Right>
    </ListItem>
  );
}
