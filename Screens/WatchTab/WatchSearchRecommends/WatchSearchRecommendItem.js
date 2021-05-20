import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import * as data from '../../../DB/db.json'

export default function WatchSearchRecommendItem({recommend}) {
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <Image source={{ uri:data.pages[recommend.pageId].avatar_url }} style={styles.recommendAvatar}></Image>
                    <Text style={styles.recommendTxt}>{data.pages[recommend.pageId].name}</Text>
                </View>
            </TouchableOpacity>
        )
}


const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: "center",
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    recommendAvatar: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderColor: '#333',
        borderWidth: 0.3,
        marginRight: 10
    },
    recommendTxt: {
        fontSize: 16,
        fontWeight: '500'
    }
})
