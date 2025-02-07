import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import colors from '../components/colors';
import { StatusBar } from 'expo-status-bar';


const Verification = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name='arrowleft' color={'#fff'} size={24}/>
        </TouchableOpacity>

        <View style={styles.verificationContainer}>
            <Image source={require('../assets/icons/face.png')} style={styles.icon}/>
            <Text style={styles.verificationTitle}>Verify your identity</Text>
            <Text style={styles.description}>We are verifying your account to be sure you are a human.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FaceCapturing')}>
            <Text style={styles.buttonText}>Let's verify</Text>
        </TouchableOpacity>
        <StatusBar style='light'/>
    </View>
  )
}

export default Verification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20
    },
    verificationContainer: {
        marginTop: 300,
        alignItems: 'center',
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    verificationTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        paddingVertical: 15,
        marginTop: 'auto',
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
})