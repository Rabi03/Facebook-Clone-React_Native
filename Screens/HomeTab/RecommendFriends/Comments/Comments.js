import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  ScrollView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Comment from './Comment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { getStatusBarHeight } from 'react-native-status-bar-height';
export const STATUSBAR_HEIGHT = getStatusBarHeight();

export default function Comments({ navigation, route }) {
  const ref = useRef();
  const scrollRef = useRef();
  const [enable, setenable] = useState(true);

  let _containerTop = new Animated.Value(0);
  const _onScrollDown = (event) => {
    if (!enable) return;
    const { translationY } = event.nativeEvent;
    _containerTop.setValue(translationY);
  };

  const _onScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y <= 0 && !enable) {
      setenable(true);
    }
    if (nativeEvent.contentOffset.y > 0 && enable) {
      setenable(false);
    }
  };
  const _onHandlerStateChangeHandler = ({ nativeEvent }) => {
    if (!enable) return;
    const { translationY, state } = nativeEvent;
    if (state === State.END) {
      if (translationY <= 500) {
        Animated.timing(_containerTop, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else {
        navigation.navigate('Home');
      }
    }
  };
  const onPressBtnBackHandler = () => {
    navigation.navigate('Home');
  };
  const containerTop = _containerTop;
  const { comments } = route.params;
  return (
    <View>
      <View style={styles.backdrop}></View>
      <KeyboardAvoidingView
        behavior='height'
        enabled
        style={{ ...styles.keyboardAvoidingContainer }}
      >
        <Animated.View style={{ ...styles.wrapper, marginTop: containerTop }}>
          <View style={styles.navigationStackBar}>
            <TouchableOpacity
              onPress={onPressBtnBackHandler}
              style={styles.btnBack}
            >
              <FontAwesome5Icon name='arrow-left' size={24}></FontAwesome5Icon>
            </TouchableOpacity>
            <View style={styles.stackBarTitle}>
              <Text style={{ fontSize: 16 }}>Comments</Text>
            </View>
          </View>
          <PanGestureHandler
            onHandlerStateChange={_onHandlerStateChangeHandler.bind(this)}
            enabled={enable}
            ref={ref}
            activeOffsetY={5}
            failOffsetY={-5}
            onGestureEvent={_onScrollDown.bind(this)}
          >
            <ScrollView
              ref={scrollRef}
              waitFor={enable ? ref : scrollRef}
              scrollEventThrottle={40}
              onScroll={_onScroll.bind(this)}
              style={styles.container}
            >
              {comments.map((comment, index) => (
                <Comment key={index} comment={comment}>
                  Detail
                </Comment>
              ))}
            </ScrollView>
          </PanGestureHandler>
          <View style={styles.commentInputWrapper}>
            <TouchableOpacity style={styles.cameraIconWrapper}>
              <FontAwesome5Icon name='camera' size={20}></FontAwesome5Icon>
            </TouchableOpacity>
            <View style={styles.textInputWrapper}>
              <TextInput autoFocus={true} style={styles.textInput}></TextInput>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity style={styles.iconItem}>
                <FontAwesome5Icon
                  name='grip-horizontal'
                  size={20}
                ></FontAwesome5Icon>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <FontAwesome5Icon name='grin-wink' size={20}></FontAwesome5Icon>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const STACK_NAVBAR_HEIGHT = 48;
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    height: screenHeight,
    zIndex: 2,
  },
  wrapper: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
  },
  commentInputWrapper: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    left: 0,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconWrapper: {
    backgroundColor: '#ddd',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputWrapper: {
    height: 40,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
    backgroundColor: '#ddd',
    marginLeft: 10,
    width: screenWidth - 40 - 80 - 30 - 10,
    borderRightWidth: 0,
  },
  textInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,
    height: 40,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0,
  },
  navigationStackBar: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 25,
  },
  btnBack: {
    zIndex: 99,
  },
  stackBarTitle: {
    position: 'absolute',
    width: screenWidth,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 40,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});
