import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import WatchSearchRecommends from './WatchSearchRecommends/WatchSearchRecommends';

export default function WatchSearch({ navigation }) {
  const onPressGroupCategoriesHandler = () => {
    navigation.push('GroupCategories');
  };
  const onPressSeenVideosHandler = () => {
    navigation.push('SeenVideos');
  };
  const onPressGoBackHandler = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchToolWrapper}>
        <TouchableOpacity onPress={onPressGoBackHandler} style={styles.btnBack}>
          <FontAwesome5Icon size={20} name='arrow-left'></FontAwesome5Icon>
        </TouchableOpacity>
        <TextInput
          placeholder='Search in Watch'
          style={styles.searchInput}
        ></TextInput>
      </View>
      <View style={styles.historyWrapper}>
        <TouchableOpacity
          onPress={onPressSeenVideosHandler}
          style={styles.searchResult}
        >
          <FontAwesome5Icon
            style={{ width: 30 }}
            size={16}
            name='eye'
            color='#ddd'
          ></FontAwesome5Icon>
          <Text style={{ fontSize: 16 }}>Watched videos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.watchRecommendsWrapper}>
        <View style={styles.watchRecommendsTitle}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Recommends in Watch
          </Text>
        </View>
        <WatchSearchRecommends navigation={navigation} />
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionTitle}>Search videos in Watch</Text>
        <Text style={styles.descriptionSubtitle}>
          Search thread or any keywords to watch video{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  searchToolWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#ddd',
    marginTop: 30,
  },
  btnBack: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    borderRadius: 48,
    backgroundColor: '#ddd',
    width: screenWidth - 60,
    height: 35,
    paddingHorizontal: 15,
  },
  historyWrapper: {
    borderBottomWidth: 5,
    borderBottomColor: '#ddd',
  },
  searchResult: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  watchRecommendsWrapper: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  watchRecommendsTitle: {
    paddingHorizontal: 15,
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#ddd',
  },
  descriptionWrapper: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgb(242,242,242)',
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  descriptionSubtitle: {
    fontSize: 16,
    color: '#333',
  },
});
