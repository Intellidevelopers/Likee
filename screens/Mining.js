import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Mining = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mining</Text>
    </View>
  )
}

export default Mining

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
})