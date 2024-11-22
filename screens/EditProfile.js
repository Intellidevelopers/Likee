import React, {useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../components/colors';
import MoreAboutYouScreen from '../components/About';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import QusetionsSection from '../components/QusetionsSection';
import InterestTags from '../components/InterestTags';
import SocialSection from '../components/SocialSection';
import VerificationSection from '../components/VerificationSection';
import NumberSection from '../components/NumberSection';

const EditProfile = () => {
    const progressAnim = useRef(new Animated.Value(0)).current; // Animated value starts at 0

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 100, // Animate to 100%
      duration: 2000, // Animation duration (in milliseconds)
      useNativeDriver: false, // Required for width animations
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
        
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.textWithProgress}>
        <Text style={styles.headerText}>100% complete</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="eye-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>

      {/* Photos Section */}
     <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.photosSection}>
        <View style={styles.photosContainer}>
        <View style={styles.mainPhoto}>
          <Image
            source={require('../assets/images/user1.jpg')} // Replace with actual image URL
            style={styles.photoMain}
          />
        </View>
        <View style={styles.smallPhotos}>
          {[...Array(2)].map((_, index) => (
            <TouchableOpacity key={index} style={styles.photoContainer}>
              <Image
                source={require('../assets/images/user2.jpg')} // Replace with actual image URL
                style={styles.photo}
              />
            </TouchableOpacity>
          ))}
        </View>
        </View>
        <View style={styles.addPhotosContainer}>
          {[...Array(3)].map((_, index) => (
            <TouchableOpacity key={index} style={styles.addPhoto}>
              <MaterialIcons name="add" size={34} color="gray" />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Photos Or Videos</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Information Section */}
      <View style={styles.infoSection}>
        {[
          { label: 'Adebayo Abefe, 29', detail: 'Male, Ilorin' },
          { label: 'Work', detail: 'STE CYBERTECH LTD, Software Developer' },
          { label: 'Education', detail: 'Federal university of technology Akure' },
          { label: "Why you're here", detail: 'Ready for a relationship' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.infoItem}>
            <View>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoDetail}>{item.detail}</Text>
            </View>
            <AntDesign name='right' size={16} color={colors.greyText}/>
          </TouchableOpacity>
        ))}
      </View>
      <MoreAboutYouScreen/>
      <QusetionsSection/>
      <InterestTags/>
      <SocialSection/>
      <VerificationSection/>
      <NumberSection/>
      <StatusBar backgroundColor={colors.greyBackground}/>
     </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  photosSection: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,

  },
  mainPhoto: {
    marginBottom: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10
  },
  photoMain:{
    width: 210,
    height: 210,
    borderRadius: 10,
    marginRight: 10,
    left: 5
  },
  smallPhotos: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  photoContainer: {
    marginHorizontal: 5,
  },
  addPhotosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,

  },
  addPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 10,
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 16,

  },
  infoItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  photosContainer:{
    flexDirection: 'row'
  },
  textWithProgress: {
    flex: 1,
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '50%',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden', // Ensures progress stays within bounds
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 2,
  },
});
