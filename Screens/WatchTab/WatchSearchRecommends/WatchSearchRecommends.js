import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import WatchSearchRecommendItem from './WatchSearchRecommendItem'

import * as data from '../../../DB/db.json'


export default function WatchSearchRecommends({navigation}) {
    const watchSearchRecommends = data.watch_search_recommends
        if (watchSearchRecommends.length === 0) return <View></View>
        return (
            <ScrollView bounces={false} style={styles.container} bounces={false}>
                {watchSearchRecommends.map((recommend, index) => (
                    <WatchSearchRecommendItem key={index} recommend={recommend} navigation={navigation} />
                ))}
            </ScrollView>
        )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.2,
    }
})
