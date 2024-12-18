import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';


const Friends = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>Sodate Tapcollect</Text>
          <MaterialIcons name='verified' size={18} color={'#0B6EE7'}/>
        </View>
        <TouchableOpacity>
          <Feather name="more-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Invite Title */}
      <Text style={styles.inviteTitle}>Invite friends!</Text>
      <Text style={styles.subTitle}>You and your friend will receive bonuses</Text>

      {/* Invite Option 1 */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://th.bing.com/th/id/R.a87cc347e73a336112526e9d33239ea8?rik=cCbZNfkUnKjOaQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f4Tb%2fLog%2f4TbLogd4c.png&ehk=A%2bQEThW9S%2fGemDAA8Gc3sL8cazLe%2fBR0ILLoDWgY1gs%3d&risl=1&pid=ImgRaw&r=0' }} style={styles.giftIcon} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Invite a friend</Text>
          <Text style={styles.bonusText}>🔹 +0.1 for you and your friend</Text>
        </View>
      </View>

      {/* Invite Option 2 */}
      <View style={styles.card}>
        <Image source={{ uri: 'https://directausa.com/assets/images/present.png' }} style={styles.giftIcon} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Invite a friend with Telegram Premium</Text>
          <Text style={styles.bonusText}>🔹 +0.3 for you and your friend</Text>
        </View>
      </View>

      {/* Referral Note */}
      <Text style={styles.referralText}>
        You are already a referral, invited by{' '}
        <Text style={styles.highlightedText}>LEE JUN-HO</Text>
      </Text>

      {/* List of Friends */}
      <Text style={styles.listTitle}>List of your friends (5)</Text>
      <View style={styles.friendCard}>
        <Image
          source={require('../assets/2.png')}
          style={styles.friendImage}
        />
        <Text style={styles.friendName}>Jtech Software</Text>
      </View>

      {/* Invite Button */}
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Invite a friend</Text>
      </TouchableOpacity>
      <StatusBar backgroundColor='#1F2630' style='light'/>
    </ScrollView>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2630',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 30,
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
  verifyIcon: {
    fontSize: 18,
    marginLeft: 5,
  },
  inviteTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    color: '#eee',
    textAlign: 'center',
    marginBottom: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2A3240',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  giftIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bonusText: {
    color: '#f0ad4e',
    marginTop: 5,
  },
  referralText: {
    color: '#eee',
    textAlign: 'center',
    marginBottom: 15,
  },
  highlightedText: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  listTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A3240',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
  },
  inviteButton: {
    backgroundColor: '#5b57ff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 90
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerTitleContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  }
});
