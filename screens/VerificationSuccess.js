import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../components/colors'

const VerificationSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <Image source={require('../assets/icons/Protect.png')} style={styles.icon}/>
      <Text style={styles.title}>Congratulations</Text>
      <Text style={styles.subtitle}>Your verification has been successfully submitted and your documents is been reviewed.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
        <Text style={{fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center'}}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default VerificationSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        color: '#f5f5f5',
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        marginTop: 'auto',
        width: '100%',
        alignSelf: 'center',
    },
    content:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto'
    }
 
})