import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from 'react-native-vector-icons';
import colors from './colors';

const SocialSection = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Instagram</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={30} color="#333" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.descContainer}>
        <Text style={styles.description}>
            Let people see your most recent Instagram posts on your profile. 
            Adding Instagram won't share your username
        </Text>

        <TouchableOpacity style={styles.addInstagramButton} onPress={() => alert('Add Instagram')}>
            <AntDesign name="instagram" size={24} color="#fff" />
            <Text style={styles.addInstagramText}>Connect Instagram</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default SocialSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: colors.white
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 15, // Added gap between buttons for spacing
    alignItems: 'center',
    padding: 10

  },
  addButton: {
    backgroundColor: colors.greyBackground,
    borderRadius: 12,
    padding: 40, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: colors.black,
    paddingTop: 10
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
  descContainer:{
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  description:{
    color: colors.greyText,
    fontSize: 14,
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
  },
  verificationTitle:{
    fontSize: 20,
    fontWeight: '700',
  }
});
