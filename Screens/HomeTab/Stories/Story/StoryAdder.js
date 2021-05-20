import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function StoryAdder() {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <ImageBackground
          imageStyle={{ resizeMode: 'cover' }}
          style={styles.imageBackground}
          source={{
            uri: 'https://scontent.fdac17-1.fna.fbcdn.net/v/t1.6435-9/122594012_1015598028852771_8423319275610753691_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zwi5eN4pgEcAX9w3jtS&_nc_ht=scontent.fdac17-1.fna&oh=2d2ca798ca6aaf79ec3fd2d4b239677a&oe=60CA0C6A',
          }}
        >
          <View style={styles.iconWrapper}>
            <Icon name='plus' size={24} color='#318bfb' />
          </View>
        </ImageBackground>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Add your story</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  imageBackground: {
    position: 'relative',
    height: 250,
    width: 150,
  },
  iconWrapper: {
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 50,
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {},
  nameWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
  },
});
