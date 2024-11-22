import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from 'react-native-vector-icons';
import colors from './colors';

const VerificationSection = () => {
  return (
    <View style={styles.verificationContainer}>
        <View style={styles.headerContainer}>
            <Text style={styles.verificationTitle}>Verification</Text>
            <AntDesign name='checkcircle' size={20} color={'#2A79E0'}/>
        </View>
        <Text style={styles.description}>
            Get notified when people like or comment on your posts.
        </Text>
    </View>
  )
}

export default VerificationSection

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
  verificationContainer:{
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: colors.white
  },
  verificationTitle:{
    fontSize: 20,
    fontWeight: '700',
  }
})