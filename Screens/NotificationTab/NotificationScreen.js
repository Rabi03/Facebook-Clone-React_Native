import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import NotificationList from './NotificationList/NotificationList';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import * as data from '../../DB/db.json';

export default function NotificationScreen({ navigation }) {
  const onPressSearchHandler = () => {
    navigation.navigate('FindFriends', {
      friends: data.users[0].friends,
    });
  };
  const notifications = data.notifications;
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity
          onPress={onPressSearchHandler}
          style={styles.btnSearch}
        >
          <FontAwesome5Icon name='search' style={{ fontSize: 20 }} />
        </TouchableOpacity>
      </View>
      <Text style={styles.notiTitle}>New</Text>
      <NotificationList notifications={notifications.splice(0, 2)} />
      <Text style={styles.notiTitle}>Before that</Text>
      <NotificationList notifications={notifications} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  btnSearch: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginHorizontal: 20,
  },
});
