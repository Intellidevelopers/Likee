import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from './colors'

const InterestTags = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Interests</Text>
        <TouchableOpacity>
            <Text style={styles.addInterestText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tagsContainer}>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagText}>#laughing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagText}>#dinnerwithfriends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagText}>#weekendtrips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagText}>#pizza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagText}>#ocean</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagText}>#listentomusic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagButton}>
            <Text style={styles.tagText}>#humour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagButton}>
            <Text style={styles.tagText}>#travel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InterestTags

const styles = StyleSheet.create({
    itemContainer: {
        paddingTop: 20,
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    addInterestText: {
        fontSize: 16,
        color: '#483D8B',
        fontWeight: '500'
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    tagButton: {
        padding: 5,
        backgroundColor: colors.label,
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 15
    },
    tagText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})