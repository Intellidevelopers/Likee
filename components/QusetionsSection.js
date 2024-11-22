import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from './colors';


const QusetionsSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Answer questions</Text>
      <View style={styles.itemContainer}>
        <FontAwesome name='quote-right' size={24}/>
        <View style={styles.subContainer}>
        <View>
            <Text style={styles.questionText}>What's your take on monogamy?</Text>
            <Text style={styles.answerText}>I'm down to try it</Text>
        </View>
        <AntDesign name='right' size={16}/>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <FontAwesome name='quote-right' size={24}/>
        <View style={styles.subContainer}>
        <View>
            <Text style={styles.questionText}>How would your best friend describe you?</Text>
            <Text style={styles.answerText}>A problem solver</Text>
        </View>
        <AntDesign name='right' size={16}/>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <FontAwesome name='quote-right' size={24}/>
        <View style={styles.subContainer}>
        <View>
            <Text style={styles.questionText}>What are you looking for?</Text>
            <Text style={styles.answerText}>Deep connections only</Text>
        </View>
        <AntDesign name='right' size={16}/>
        </View>
      </View>
    </View>
  )
}

export default QusetionsSection

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: colors.white,
        marginTop: 20,
        padding: 10
    },
    title:{
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 20,
        backgroundColor: colors.greyBackground,
        padding: 10,
        borderRadius: 10
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    questionText: {
        fontSize: 18,
        fontWeight: '500'
    },
    answerText: {
        fontSize: 15,
        color: '#666'
    }
 });