import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/coming.png')} style={styles.image}/>
    </View>
  )
}

export default ComingSoon

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
})