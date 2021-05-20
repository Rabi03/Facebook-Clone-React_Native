import React from 'react';
import {
  Keyboard,
  Animated,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useState } from 'react';
import { useEffect } from 'react';

import { Button } from 'native-base';

import * as data from '../../DB/db.json';

export default function FullPostTool({ navigation }) {
  const [selectedBgColorId, setselectedBgColorId] = useState(0);
  const _editorWrapperHeight = new Animated.Value(100);
  let _isShowBgColors = true;
  const _bgColorListWidth = new Animated.Value(screenWidth - 60);
  const _toggleZindexValue = new Animated.Value(2);
  const _degTransformToggle = new Animated.Value(0);
  const _scaleTransformToggle = new Animated.Value(0);
  let _isKeyBoardVisibled = false;
  const _distanceTopOption = new Animated.Value(0);
  let _prevTranslatetionY = 0;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow.bind(this)
    );
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      _keyboardWillShow.bind(this)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide.bind(this)
    );
  }, []);

  const _keyboardWillShow = () => {
    _distanceTopOption.setValue(0);
    _prevTranslatetionY = 0;
  };
  const _keyboardDidShow = () => {
    _isKeyBoardVisibled = true;
    if (!_isShowBgColors) {
      Animated.timing(_scaleTransformToggle, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        _toggleZindexValue.setValue(2);
        Animated.timing(_degTransformToggle, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {});
      });
      Animated.spring(_bgColorListWidth, {
        toValue: screenWidth - 60,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        _isShowBgColors = true;
      });
    }
  };

  const _keyboardDidHide = () => {
    _isKeyBoardVisibled = false;
  };

  const preloadBgImages = (bgImages) => {
    let preFetchTasks = [];
    for (let bgImage of bgImages) {
      if (!bgImage.isPureColor) {
        preFetchTasks.push(Image.prefetch(bgImage.bgImage_url));
      }
    }
    Promise.all(preFetchTasks).then((results) => {
      let downloadedAll = true;
      results.forEach((result) => {
        if (!result) {
          downloadedAll = false;
        }
      });
    });
  };
  preloadBgImages(data.bg_colors);

  const onPressGoBackHandler = () => {
    navigation.navigate('Home');
  };
  const onContentSizeChangeHandler = ({ nativeEvent }) => {
    const { height } = nativeEvent.contentSize;
    Animated.timing(_editorWrapperHeight, {
      toValue: height + 20,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const onSelectBgColorHandler = (bgColorId) => {
    setselectedBgColorId(bgColorId);
  };
  const onPressShowOptions = () => {
    Keyboard.dismiss();
    if (_prevTranslatetionY == 0) {
      Animated.spring(_distanceTopOption, {
        toValue: 247.5,
        duration: 200,
        useNativeDriver: true,
      }).start(() => (_prevTranslatetionY = 247.5));
    } else if (_prevTranslatetionY === 247.5) {
      Animated.spring(_distanceTopOption, {
        toValue: 600,
        duration: 200,
        useNativeDriver: true,
      }).start(() => (_prevTranslatetionY = 600));
    } else {
      Animated.spring(_distanceTopOption, {
        toValue: 247.5,
        duration: 200,
        useNativeDriver: true,
      }).start(() => (_prevTranslatetionY = 247.5));
    }
  };

  const bgColors = data.bg_colors;
  const selectedBgColor = bgColors.filter(
    (bgColor) => bgColor.id === selectedBgColorId
  )[0];
  return (
    <ScrollView
      style={styles.parentContainer}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <KeyboardAvoidingView style={styles.container} enabled behavior='height'>
        <View style={styles.navigationBar}>
          <TouchableOpacity
            onPress={onPressGoBackHandler.bind(this)}
            style={styles.naviIcon}
          >
            <FontAwesome5Icon
              color='#000'
              name='arrow-left'
              size={20}
            ></FontAwesome5Icon>
          </TouchableOpacity>
          <Text style={styles.naviTitle}>Create a post</Text>
          <TouchableOpacity style={styles.btnPost}>
            <Text style={{ fontSize: 16 }}>POST</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoWrapper}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg',
            }}
          ></Image>
          <View>
            <Text style={styles.name}>Rabi Islam</Text>
            <View style={styles.areaWrapper}>
              <TouchableOpacity style={styles.areaOption}>
                <FontAwesome5Icon
                  style={{ marginRight: 3 }}
                  name='globe-asia'
                  size={14}
                >
                  {' '}
                </FontAwesome5Icon>
                <Text>Public</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.areaOption}>
                <FontAwesome5Icon
                  style={{ marginRight: 3 }}
                  name='plus'
                  size={14}
                ></FontAwesome5Icon>
                <Text>Public</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {selectedBgColor && (
          <ImageBackground
            source={
              !selectedBgColor.isPureColor
                ? { uri: selectedBgColor.bgImage_url }
                : {}
            }
            style={{
              ...styles.editorWrapper,
              backgroundColor: selectedBgColor.isPureColor
                ? selectedBgColor.color
                : '',
            }}
          >
            <TextInput
              onContentSizeChange={onContentSizeChangeHandler.bind(this)}
              placeholderTextColor={selectedBgColor.textColor}
              placeholder='What are you thinking ?'
              multiline
              style={{
                ...styles.editor,
                fontSize: 26,
                color: selectedBgColor.textColor,
                fontWeight: 'bold',
                paddingLeft: 5,
                paddingRight: 5,
                textAlignVertical: 'top',
              }}
            ></TextInput>
          </ImageBackground>
        )}

        <Animated.View style={styles.toolOptionsWrapper}>
          <View style={styles.bgColorsWrapper}>
            <Animated.View style={{ flexDirection: 'row', width: 363 }}>
              <ScrollView
                horizontal={true}
                style={{ ...styles.bgColorsScrollView }}
                showsHorizontalScrollIndicator={false}
              >
                {bgColors.map((bgColor, index) => (
                  <View key={index}>
                    {bgColor.isPureColor && (
                      <TouchableWithoutFeedback
                        style={styles.bgColor}
                        onPress={onSelectBgColorHandler.bind(this, bgColor.id)}
                      >
                        <View
                          style={{
                            backgroundColor: bgColor.color,
                            ...styles.bgImage,
                            borderColor:
                              selectedBgColorId === bgColor.id
                                ? '#318bfb'
                                : '#333',
                            borderWidth:
                              selectedBgColorId === bgColor.id ? 3 : 1,
                          }}
                        ></View>
                      </TouchableWithoutFeedback>
                    )}
                    {!bgColor.isPureColor && (
                      <TouchableWithoutFeedback
                        style={styles.bgColor}
                        onPress={onSelectBgColorHandler.bind(this, bgColor.id)}
                      >
                        <Image
                          style={{
                            ...styles.bgImage,
                            borderColor:
                              selectedBgColorId === bgColor.id
                                ? '#318bfb'
                                : '#333',
                            borderWidth:
                              selectedBgColorId === bgColor.id ? 3 : 1,
                          }}
                          source={{ uri: bgColor.bgImage_url }}
                        ></Image>
                      </TouchableWithoutFeedback>
                    )}
                  </View>
                ))}
              </ScrollView>
            </Animated.View>
          </View>
          <Animated.View style={{ ...styles.optionsWrapper }}>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/photo.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Image/Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/friend.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Tag your friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/emoji.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Emotion/Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/gps.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Check in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/live-news.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Live Stream</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/photograph.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/letter-a.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Background</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/360-view.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>3D Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/gif.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>File GIF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/popcorn.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Watch together</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTitle,
                justifyContent: 'flex-start',
              }}
            >
              <Image
                style={{
                  ...styles.optionImage,
                  width: 30,
                  marginRight: 15,
                }}
                source={require('../../assets/icons/like.png')}
              ></Image>
              <Text style={{ fontSize: 16 }}>Request recommends</Text>
            </TouchableOpacity>
          </Animated.View>
          <Button block style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={{ color: '#fff' }}>Post</Text>
          </Button>
        </Animated.View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  parentContainer: {
    height: screenHeight,
    position: 'relative',
  },
  container: {
    height: '30%',
    width: '100%',
    backgroundColor: '#fff',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    height: 50,
    marginTop: 20,
  },
  naviIcon: {
    padding: 10,
  },
  naviTitle: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  btnPost: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
  },
  infoWrapper: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaWrapper: {
    flexDirection: 'row',
  },
  areaOption: {
    marginRight: 10,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  editorWrapper: {
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingBottom: 12,
  },
  editor: {
    height: '100%',
    width: '100%',
  },
  toolOptionsWrapper: {
    bottom: 0,
    left: 0,
    width: '100%',
    paddingBottom: 10,
    flexGrow: 1,
  },
  optionsWrapper: {
    backgroundColor: '#fff',
    width: '100%',
    left: 0,
    zIndex: 999999,
  },
  optionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 55,
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  optionImagesWrapper: {
    flexDirection: 'row',
    zIndex: 1,
  },
  optionImage: {
    height: 25,
    resizeMode: 'contain',
  },
  bgColorsWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
  },
  bgColorsScrollView: {
    flexDirection: 'row',
  },
  btnBgColor: {
    height: 30,
    width: 30,
  },
  bgColor: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  bgImage: {
    resizeMode: 'cover',
    height: 30,
    width: 30,
    borderRadius: 10,
    borderWidth: 1,
  },
  toggleBgColors: {
    padding: 5,
    borderWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  moreBgColors: {},
});
