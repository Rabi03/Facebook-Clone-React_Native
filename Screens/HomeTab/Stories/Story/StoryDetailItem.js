import React, { useEffect, useState } from 'react';
import {
  Animated,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function StoryDetailItem(props) {
  const { swiper, storyDetail, position, StoryPosition, stories } = props;
  const [displayImage, setdisplayImage] = useState(storyDetail.images[0]);
  const [displayPosition, setdisplayPosition] = useState(0);
  let widthAnim = new Animated.Value(0);

  const onSwipeHorizontalHandler = (gestureState) => {
    widthAnim.stopAnimation();
  };
  const onPressGoBackHandle = () => {
    props.navigation.goBack();
  };

  if (position === StoryPosition) {
    widthAnim = new Animated.Value(0);
    Animated.timing(widthAnim, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      if (displayPosition < storyDetail.images.length - 1) {
        setdisplayImage(storyDetail.images[displayPosition + 1]);
        setdisplayPosition(displayPosition + 1);
      } else {
        if (position < stories.length - 1) {
          widthAnim = new Animated.Value(0);
        } else {
          widthAnim.stopAnimation();
        }
      }
    });
  }
  const width = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      config={config}
      onSwipeRight={(state) => onSwipeHorizontalHandler(state)}
      onSwipeLeft={(state) => onSwipeHorizontalHandler(state)}
    >
      <ImageBackground
        blurRadius={50}
        imageStyle={{ resizeMode: 'cover' }}
        style={styles.backgroundWrapper}
        source={{ uri: displayImage.url }}
      >
        <View>
          <View style={styles.topBarWrapper}>
            {storyDetail.images.map((image, index) => (
              <View
                key={index}
                style={{
                  ...styles.topBar,
                  width: Math.round(100 / storyDetail.images.length) + '%',
                  height: 3,
                  backgroundColor: 'gray',
                }}
              >
                {index < displayPosition && (
                  <Animated.View
                    style={{
                      ...styles.increaseBar,
                      width: '98%',
                      height: 3,
                      backgroundColor: '#fff',
                    }}
                  />
                )}
                {index === displayPosition && (
                  <Animated.View
                    style={{
                      ...styles.increaseBar,
                      width: width,
                      height: 3,
                      backgroundColor: '#fff',
                    }}
                  />
                )}
                {index > displayPosition && (
                  <Animated.View
                    style={{
                      ...styles.increaseBar,
                      width: '0%',
                      height: 3,
                      backgroundColor: '#fff',
                    }}
                  />
                )}
              </View>
            ))}
          </View>
          <View style={styles.userWrapper}>
            <TouchableOpacity
              onPress={onPressGoBackHandle.bind(this)}
              style={styles.backBtn}
            >
              <Icon name='arrow-left' color='#fff' size={24}></Icon>
            </TouchableOpacity>
            <Image
              style={styles.userAvatar}
              source={{ uri: storyDetail.user.avatar_url }}
            ></Image>
            <View style={styles.userInfoWrapper}>
              <Text style={styles.name}>{storyDetail.user.name}</Text>
              <Text style={styles.time}>{displayImage.create_at}</Text>
            </View>
          </View>
          <Image
            resizeMode='contain'
            style={styles.image}
            source={{ uri: displayImage.url }}
          ></Image>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            horizontal={true}
            style={styles.reactionWrapper}
          >
            <TextInput
              placeholderTextColor='#fff'
              style={styles.msgInput}
              placeholder='Send message to poster'
            ></TextInput>
            <View style={styles.iconWrapper}>
              <TouchableOpacity>
                <FontAwesome5Icon
                  style={styles.reactionIcon}
                  name='paper-plane'
                  color='white'
                ></FontAwesome5Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name='thumbs-up'
                  color='#318bfb'
                  backgroundColor='#fff'
                  style={styles.reactionIcon}
                ></Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name='heart'
                  color='#e8304a'
                  backgroundColor='white'
                  style={styles.reactionIcon}
                ></Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name='grin-squint'
                  color='#f7ca51'
                  backgroundColor='white'
                  style={styles.reactionIcon}
                ></Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name='surprise'
                  color='#f7ca51'
                  backgroundColor='white'
                  style={styles.reactionIcon}
                ></Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name='sad-tear'
                  color='#f7ca51'
                  backgroundColor='white'
                  style={styles.reactionIcon}
                ></Icon>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  lineBreakMode={false}
                  name='angry'
                  color='#dc4311'
                  backgroundColor='white'
                  style={{ ...styles.reactionIcon, marginRight: 40 }}
                ></Icon>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </GestureRecognizer>
  );
}

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  backBtn: {
    padding: 10,
    paddingLeft: 0,
  },
  backgroundWrapper: {
    height: '100%',
    justifyContent: 'space-between',
  },
  topBarWrapper: {
    flexDirection: 'row',
    paddingTop: 40,
  },
  topBar: {},
  increaseBar: {},
  reactionWrapper: {
    zIndex: 99,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.0)',
    bottom: 10,
    paddingHorizontal: 20,
    marginRight: 50,
  },
  msgInput: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 48,
    width: screenWidth * 0.6,
    color: '#fff',
    marginRight: 15,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  reactionIcon: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  image: {
    height: screenHeight * 0.8,
  },
  userWrapper: {
    zIndex: 99,
    flexDirection: 'row',
    top: 10,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, .0)',
    paddingHorizontal: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 15,
  },
  userInfoWrapper: {
    height: 40,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  time: {
    color: '#fff',
  },
});
