import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import colors from './colors';
import { useNavigation } from '@react-navigation/native';



const Activities = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={20}/>
        </TouchableOpacity>

        <View style={styles.activityContainer}>
        <SimpleLineIcons name="speedometer" size={24} color="black" />
        <Text style={styles.activityTitle}>Your activity:</Text>
        <Text style={styles.activityStatus}>Low</Text>
      </View>
      </View>

      {/* Activity Status */}
      

      {/* Line Chart */}
      <LineChart
        data={{
          labels: ['16', '17', '18', '19', '20', '21', '22'],
          datasets: [
            {
              data: [3, 6, 4, 5, 7, 3, 2],
              color: () => '#000', // Line color
              strokeWidth: 2, // Line thickness
            },
          ],
        }}
        width={400} // Chart width
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // Show integers only
          color: () => `#000`,
          labelColor: () => '#666',
          style: { borderRadius: 16 },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#fff',
          },
        }}
        bezier
        style={styles.chart}
      />

      {/* Subtext */}
      <Text style={styles.chartSubText}>Tap the date to see detailed stats</Text>

      {/* Action Cards */}
      <View style={styles.cardsContainer}>
        {/* First Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Entypo name='video' size={30}/>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Your free credits are just a quick video away!</Text>
              <TouchableOpacity style={styles.button} onPress={() => alert('No video available to watch')}>
                <Text style={styles.buttonText}>Get 10 free credits</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Second Card */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
              <Image
                source={require('../assets/images/user1.png')}
                style={styles.icon}
              />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Move to the top and get seen by more people around you</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Credit')}>
                <Text style={styles.buttonText}>Rise Up!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.greyBackground,
      padding: 10,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Adjust spacing between elements
      width: '100%',
      marginBottom: 20,
      paddingHorizontal: 5, // Add some padding for better alignment
      marginTop: 40
    },
    backButton: {
    },
    activityContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20
    },
    activityTitle: {
      fontSize: 16,
      color: '#666',
      fontWeight: '500',
    },
    activityStatus: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 5,
    },
    chart: {
      borderRadius: 16,
      width: Dimensions.get('window').width - 10, // Make chart responsive
      alignSelf: 'center',
      marginVertical: 20,
      left: -30
    },
    chartSubText: {
      textAlign: 'center',
      color: '#333',
      fontSize: 16,
      marginBottom: 20,
    },
    cardsContainer: {
      flex: 1,
      width: '100%',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center'
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#EDE7FE',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    cardTextContainer: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      color: '#333',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#000',
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    buttonText: {
      color: '#fff',
      fontSize: 14,
      textAlign: 'center',
    },
  });
  
