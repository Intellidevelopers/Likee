import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


const NearbyHeader = () => {
  return (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Nearby</Text>
        <TouchableOpacity style={styles.boostButton} onPress={() => setIsBottomSheetVisible(true)}>
        <Ionicons name="flash" size={20} color="white" />
        <Text style={styles.boostButtonText}>Boost Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
    </View>
  )
}

export default NearbyHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: '15%'
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
      },
      boostButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
      },
      boostButtonText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 5,
      },
      settingsButton: {
        padding: 5,
      },
})