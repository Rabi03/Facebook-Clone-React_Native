import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function PostDetail({ navigation, route }) {
  const [detailDisplay, setdetailDisplay] = useState('flex');
  const [isLiked, setisLiked] = useState(false);
  let optionBottom = new Animated.Value(-screenHeight);

  const onPressOptionIconHandler = () => {
    Animated.timing(optionBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const onPressCommentsHandler = () => {
    const { comments } = route.params.item;
    navigation.navigate('CommentsPopUp', {
      comments,
    });
  };
  const onPressHideDetailWrapperHandler = () => {
    setdetailDisplay(detailDisplay === 'flex' ? 'none' : 'flex');
  };
  const onPressBackdropOptionListHandler = () => {
    Animated.timing(optionBottom, {
      toValue: -screenHeight,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  let reactionValue = route.params.item.reactions.total;
  let postDetail = route.params.item;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.postWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            resizeMode='contain'
            source={{ uri: postDetail.image }}
          ></Image>
        </View>
        <View style={{ ...styles.optionIconWrapper, display: detailDisplay }}>
          <TouchableOpacity
            style={styles.cycleWrapper}
            onPress={onPressOptionIconHandler.bind(this)}
          >
            <FontAwesome5Icon
              name='ellipsis-v'
              color='#fff'
              size={20}
            ></FontAwesome5Icon>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{ ...styles.optionListWrapper, bottom: optionBottom }}
        >
          <View style={styles.optionBackDrop}>
            <TouchableOpacity
              onPress={onPressBackdropOptionListHandler.bind(this)}
              style={{ width: '100%', height: '100%' }}
            >
              <View></View>
            </TouchableOpacity>
          </View>
          <View style={styles.allOptionWrapper}>
            <TouchableOpacity>
              <View style={styles.optionItemWrapper}>
                <FontAwesome5Icon name='download' size={20}></FontAwesome5Icon>
                <Text style={styles.optionText}>Save to your phone</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.optionItemWrapper}>
                <FontAwesome5Icon name='share' size={20}></FontAwesome5Icon>
                <Text style={styles.optionText}>Share it outside</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.optionItemWrapper}>
                <FontAwesome5Icon name='flag' size={20}></FontAwesome5Icon>
                <Text style={styles.optionText}>Find support or report</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={{ ...styles.postContentWrapper, display: detailDisplay }}>
          <View>
            <TouchableOpacity>
              <Text style={styles.name}>{postDetail.user?.name}</Text>
            </TouchableOpacity>
            <Text style={styles.content}>{postDetail.content}</Text>
            <Text style={styles.time}>{postDetail.create_at}</Text>
          </View>
          <View style={styles.reactionValueWrapper}>
            <TouchableOpacity>
              <View style={styles.reactionNumberWrapper}>
                <FontAwesome5Icon
                  name='thumbs-up'
                  color='#318bfb'
                  size={14}
                ></FontAwesome5Icon>
                <Text style={{ color: '#fff', marginLeft: 5 }}>
                  {reactionValue}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressCommentsHandler.bind(this)}>
              <Text style={{ color: '#fff' }}>
                {postDetail.comments.length} comments
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnReactionWrapper}>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPres={() => setisLiked(!isLiked)}
            >
              <View style={styles.reactionBtn}>
                <FontAwesome5Icon
                  name='thumbs-up'
                  color={!isLiked ? '#fff' : '#318bfb'}
                  size={20}
                ></FontAwesome5Icon>
                <Text style={styles.reactionBtnText}>Like</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={onPressCommentsHandler.bind(this)}
            >
              <View style={styles.reactionBtn}>
                <FontAwesome5Icon
                  name='comment-alt'
                  color='#fff'
                  size={20}
                ></FontAwesome5Icon>
                <Text style={styles.reactionBtnText}>Comment</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrapper}>
              <View style={styles.reactionBtn}>
                <FontAwesome5Icon
                  name='share'
                  color='#fff'
                  size={20}
                ></FontAwesome5Icon>
                <Text style={styles.reactionBtnText}>Share</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  postWrapper: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,1)',
    height: '100%',
  },
  optionIconWrapper: {
    position: 'absolute',
    right: 30,
    top: 50,
    zIndex: 999999,
  },
  cycleWrapper: {
    padding: 10,
  },

  optionListWrapper: {
    position: 'absolute',
    left: 0,
    height: '100%',
    zIndex: 999999,
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
  },
  allOptionWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  optionBackDrop: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  optionItemWrapper: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  postContentWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    left: 0,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    color: '#fff',
  },
  time: {
    marginTop: 5,
    color: '#fff',
    textTransform: 'uppercase',
    opacity: 0.5,
  },
  btnReactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  reactionBtnText: {
    color: '#fff',
    marginLeft: 5,
  },
  btnWrapper: {
    flex: 1,
  },
  reactionBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {},
  image: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',
  },
  reactionValueWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  reactionNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
