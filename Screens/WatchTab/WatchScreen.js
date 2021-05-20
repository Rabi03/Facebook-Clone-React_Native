import React, { useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import WatchList from './WatchList/WatchList';
import * as data from '../../DB/db.json';

export default function WatchScreen({ navigation }) {
  const _scrollRef = useRef();
  const onPressWatchSearchHandler = () => {
    navigation.navigate('WatchSearch');
  };
  const watch_list = data.users[1].watch_list;
  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          decelerationRate={0.8}
          scrollEventThrottle={50}
          ref={_scrollRef}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Watch</Text>
            <View style={styles.rightOptionWrapper}>
              <TouchableOpacity style={styles.btnMyList}>
                <FontAwesome5Icon name='user-alt' size={20}></FontAwesome5Icon>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressWatchSearchHandler}
                style={styles.btnSearch}
              >
                <FontAwesome5Icon size={20} name='search'></FontAwesome5Icon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.myWatchList}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Your view list{' '}
            </Text>
            <TouchableOpacity style={styles.watchListPreview}>
              {watch_list.map((page, index) => (
                <Image
                  key={index}
                  source={{ uri: data.pages[page.pageId].avatar_url }}
                  style={{
                    ...styles.watchListItem,
                    marginLeft: index === 0 ? 0 : -10,
                    zIndex: watch_list.length - index,
                  }}
                ></Image>
              ))}
            </TouchableOpacity>
          </View>
          <WatchList navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  titleWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rightOptionWrapper: {
    flexDirection: 'row',
  },
  btnMyList: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSearch: {
    marginLeft: 10,
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myWatchList: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  watchListPreview: {
    flexDirection: 'row',
  },
  watchListItem: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
});
