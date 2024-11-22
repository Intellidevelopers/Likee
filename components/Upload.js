import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Upload = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload photos from:</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <View style={styles.row}>
          {/* Your Photos */}
          <TouchableOpacity style={styles.option}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="photo" size={50} color="#000" />
            </View>
            <Text style={styles.optionText}>Your photos</Text>
          </TouchableOpacity>

          {/* Camera */}
          <TouchableOpacity style={styles.option}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="camera-alt" size={50} color="#000" />
            </View>
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {/* Instagram */}
          <TouchableOpacity style={styles.option}>
            <View style={[styles.iconBackground, styles.instagramBackground]}>
              <Image
                source={require('../assets/icons/instagram.png')}
                style={styles.iconImage}
              />
            </View>
            <Text style={styles.optionText}>Instagram</Text>
            <TouchableOpacity>
                <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity style={styles.option}>
            <View style={[styles.iconBackground, styles.facebookBackground]}>
              <Image
                source={require('../assets/icons/facebook.png')}
                style={styles.iconImage}
              />
            </View>
            <Text style={styles.optionText}>Facebook</Text>
            <TouchableOpacity>
                <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  option: {
    alignItems: 'center',
    width: '45%',
  },
  iconBackground: {
    backgroundColor: '#EDE7FE',
    width: 120,
    height: 120,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  instagramBackground: {
    backgroundColor: '#E1306C',
  },
  facebookBackground: {
    backgroundColor: '#1877F2',
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  connectText: {
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
