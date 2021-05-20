import React from 'react';
import { useState } from 'react';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function RecommendItem({ info, navigation }) {
  const [isHidden, setisHidden] = useState(false);
  const _containerOpacity = new Animated.Value(1);

  const onPressHideHandler = () => {
    Animated.timing(_containerOpacity, {
      toValue: 0,
      duration: 1000,
    }).start(() => {
      setisHidden(true);
    });
  };
  const onPressProfileHandler = (userId) => {
    navigation.navigate('ProfileX', {
      userId,
    });
  };

  const containerOpacity = _containerOpacity;
  return (
    <Animated.View
      style={{
        ...styles.container,
        display: isHidden ? 'none' : 'flex',
        opacity: containerOpacity,
      }}
    >
      <View style={styles.itemWrapper}>
        <TouchableOpacity
          onPress={onPressProfileHandler.bind(this, info.user?.id)}
          activeOpacity={0.5}
        >
          <Image
            style={styles.avatar}
            source={{ uri: info.user?.avatar_url }}
          ></Image>
        </TouchableOpacity>
        <View>
          <View style={styles.infoWrapper}>
            <TouchableOpacity
              onPress={onPressProfileHandler.bind(this, info.user?.id)}
              activeOpacity={0.5}
            >
              <Text style={styles.name}>{info.user?.name}</Text>
            </TouchableOpacity>
            <Text style={styles.mutualCount}>
              {info.mutualCount} mutual friends
            </Text>
          </View>
          <View style={styles.btnWrapper}>
            <View style={styles.btnAddFr}>
              <FontAwesome5Icon.Button
                onPress={() => console.log('click add')}
                style={{ justifyContent: 'center' }}
                name='user-plus'
                size={20}
                color='white'
              >
                Add Friend
              </FontAwesome5Icon.Button>
            </View>
            <TouchableOpacity
              onPress={onPressHideHandler.bind(this)}
              style={styles.btnHide}
            >
              <Text>Hide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  itemWrapper: {
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    overflow: 'hidden',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  avatar: {
    width: screenWidth * 0.6,
    height: 300,
  },
  infoWrapper: {
    paddingVertical: 10,
    paddingLeft: 15,
  },
  name: {
    fontSize: 16,
  },
  mutualCount: {
    fontSize: 12,
    color: '#333',
  },
  btnAddFr: {
    flex: 3,
  },
  btnHide: {
    flex: 1,
    height: 38,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginLeft: 10,
  },
});
