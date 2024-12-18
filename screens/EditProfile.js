import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import colors from '../components/colors';
import MoreAboutYouScreen from '../components/About';
import { SafeAreaView } from 'react-native-safe-area-context';
import InterestTags from '../components/InterestTags';
import SocialSection from '../components/SocialSection';
import VerificationSection from '../components/VerificationSection';
import NumberSection from '../components/NumberSection';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const EditProfile = ({ navigation }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([null, null, null]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  // Function to pick a single image for the main placeholder
  const pickMainImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMainImage(result.assets[0].uri);
    }
  };

  // Function to pick a specific additional image
  const pickAdditionalImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...additionalImages];
      newImages[index] = result.assets[0].uri;
      setAdditionalImages(newImages);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.textWithProgress}>
          <Text style={styles.headerText}>100% complete</Text>
          <View style={styles.progressBarBackground}>
            <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
          </View>
        </View>
        <TouchableOpacity>
          <Text style={{fontSize: 16, fontWeight: '500'}}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Photos Section */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.photosSection}>
          <View style={styles.photosContainer}>
            {/* Main Image */}
            <TouchableOpacity onPress={pickMainImage} style={styles.mainPhoto}>
              {mainImage ? (
                <Image source={{ uri: mainImage }} style={styles.photoMain} />
              ) : (
                <MaterialIcons name="add" size={50} color="gray" />
              )}
            </TouchableOpacity>

            {/* Additional Images */}
            <View style={styles.smallPhotos}>
              {additionalImages.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.photoContainer}
                  onPress={() => pickAdditionalImage(index)}
                >
                  {image ? (
                    <Image source={{ uri: image }} style={styles.photo} />
                  ) : (
                    <MaterialIcons name="add" size={34} color="gray" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
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
            <View key={index} style={styles.infoItem}>
              <View>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoDetail}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        <MoreAboutYouScreen />
        <InterestTags />
        <VerificationSection />
        <NumberSection />
      </ScrollView>
    </GestureHandlerRootView>
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
    paddingTop: 30
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
    width: 325,
    height: 350,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  photoMain: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  smallPhotos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  photoContainer: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
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
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 2,
  },
});
