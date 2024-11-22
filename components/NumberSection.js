import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome } from 'react-native-vector-icons';
import colors from './colors';

const NumberSection = () => {
  return (
    <View style={styles.numberContainer}>
        <Text style={styles.numberTitle}>Cell phone number</Text>
        <Text style={styles.description}>
            We'll use this to verify your account.
        </Text>

        <TouchableOpacity style={styles.addInstagramButton} onPress={() => alert('Add Phone number')}>
            <FontAwesome name="phone" size={24} color="#fff" />
            <Text style={styles.addInstagramText}>Add Number</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NumberSection

const styles = StyleSheet.create({
    description:{
        color: colors.greyText,
        fontSize: 16,
        marginBottom: 15
      },
      headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10
      },
      numberContainer:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: colors.white
      },
      numberTitle:{
        fontSize: 20,
        fontWeight: '700',
      },
      addInstagramButton:{
        backgroundColor: colors.black,
        borderRadius: 30,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        gap: 10
      },
      addInstagramText:{
        color: colors.white,
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 16
      },
})