import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable, Linking } from "react-native";
import React, { useState } from "react";
import userProfileStore from '../stores/userProfileStore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { CameraIcon } from "react-native-heroicons/outline";
import colors from "../components/colors";
import { Ionicons } from '@expo/vector-icons';

export default function UserProfile({ navigation }) { // Ensure navigation prop is received
  const { userProfile } = userProfileStore(); // Access user profile from Zustand store
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  
  const handleNavigateToChat = (user) => {
    navigation.navigate('ChatScreen', { user, imageUrl: user.imgPath }); // Pass imgPath as imageUrl
  };
  

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
      {/* Profile Image */}
      <View>
        <Image source={userProfile.imageUrl} style={styles.profileImage} />
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.cameraButton}>
          <CameraIcon size={hp(3.5)} color="white" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      {/* Details Container */}
      <View style={styles.detailsContainer}>
        <View style={styles.bioContainer}>
          <View style={styles.nameAgeContainer}>
            <Text style={styles.nameText}>
              {userProfile.name}, {userProfile.age}
            </Text>
            <TouchableOpacity
              style={styles.msgBtn}
              onPress={() => handleNavigateToChat(userProfile)} // Pass `userProfile` to the navigation function
            >
              <Ionicons name="chatbox-ellipses-outline" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Hobbies */}
          <View style={styles.hobbiesContainer}>
            {userProfile.hobbies?.map((hobby, index) => (
              <View key={index} style={styles.hobbyChip}>
                <Text style={styles.hobbyText}>{hobby}</Text>
              </View>
            ))}
          </View>

          {/* Bio */}
          <View>
            <Text style={styles.bioHeader}>BIO</Text>
            <Text style={styles.bioText}>{userProfile.bio}</Text>
          </View>
        </View>

        {/* Gallery */}
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.gallery}>
          {userProfile.gallery?.slice(0, 4).map((image, index) => (
            <Pressable key={index} style={styles.galleryImageContainer} onPress={() => openImageModal(image)}>
              <Image source={{ uri: image }} style={styles.galleryImage} />
            </Pressable>
          ))}
        </ScrollView>

        {/* Info Container */}
        <View style={styles.infoContainer}>
          <View style={styles.infoContainerRow}>
            <View>
              <Text style={styles.bioHeader}>Location</Text>
              <Text style={styles.infoText}>{userProfile.location}</Text>
            </View>

            <View>
              <Text style={styles.bioHeader}>Education</Text>
              <Text style={styles.infoText}>{userProfile.education}</Text>
            </View>
          </View>

          <Text style={styles.bioHeader}>Interests</Text>
          <View style={styles.interestsContainer}>
            {userProfile.interests?.map((interest, index) => (
              <View key={index} style={styles.interestChip}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.bioHeader}>Work Experience</Text>
            <Text style={styles.infoText}>{userProfile.workExperience}</Text>
          </View>

          {/* Social Media */}
          <Text style={styles.sectionTitle}>Social Media</Text>
          <View style={styles.hobbiesContainer}>
            {userProfile.socialMedia?.map((social, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => Linking.openURL(social.profileLink)}
                style={styles.hobbyChip}
              >
                <Text style={styles.hobbyText}>{social.platform}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Image Preview Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={closeImageModal}>
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
        </View>
      </Modal>
    </ScrollView>
  );
}

// The rest of your styles remain unchanged.

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: hp(5),
  },
  profileImage: {
    width: wp(100),
    height: hp(60),
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: hp(5),
    paddingHorizontal: wp(4),
  },
  cameraButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioContainer: {
    padding: wp(4),
    marginTop: hp(2),
  },
  nameAgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: hp(2.5),
    fontWeight: '900',
    color: '#333',
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(1),
  },
  hobbyChip: {
    backgroundColor: colors.pinkLabel,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 10,
  },
  hobbyText: {
    color: colors.pink,
  },
  bioHeader: {
    fontSize: hp(2),
    fontWeight: '900',
    color: '#000',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  bioText: {
    fontSize: hp(1.8),
    color: '#444',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -hp(10),
    paddingBottom: hp(3),
    paddingHorizontal: wp(1),
    shadowColor: "#000",
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(2),
  },
  galleryImageContainer: {
    width: wp(90), // Adjust width for 2 images per row
    height: hp(70), // Adjust height as needed
    marginBottom: hp(1),
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15

  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: wp(90),
    height: hp(70),
    resizeMode: 'contain',
  },
  modalCloseButton: {
    position: 'absolute',
    top: hp(5),
    right: wp(5),
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#333',
    fontSize: hp(2),
  },
  jobText: {
    fontSize: 16,
    color: colors.secondary,
    marginVertical: 8,
  },
  infoContainer: {
    padding: wp(5),
    borderRadius: 20,
    marginVertical: hp(2),
  },

  // Header for each info section


  // General text style for info content
  infoText: {
    fontSize: hp(1.8),
    color: '#555',
    lineHeight: hp(2.5),
    marginBottom: hp(1),
  },

  // Section title style for larger titles (like "Interests")
  sectionTitle: {
    fontSize: hp(3),
    fontWeight: '700',
    color: colors.black,
    marginTop: hp(3),
    marginBottom: hp(1),
  },

  // Container for Interests chips
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: hp(1),
  },

  // Styling for each interest chip
  interestChip: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 20,
    paddingVertical: hp(0.5),
    marginRight: wp(2),
    marginBottom: hp(1),
  },

  // Text inside interest chips
  interestText: {
    fontSize: hp(1.8),
    color: colors.secondary,
    fontWeight: '600',
  },

  // Social media link styling
  socialMediaLink: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    marginVertical: hp(0.5),
    alignItems: 'center',
    flexDirection: 'row'
  },

  // Text style for social media links
  socialMediaText: {
    fontSize: hp(1.8),
    color: colors.primary,
    fontWeight: '500',
  },
  socialMedia:{
    flexDirection: 'row'
  },
  infoContainerRow:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: hp(1)
  },
  msgBtn:{
    backgroundColor: '#22426A',
    borderRadius: 30,
    color: '#fff',
    padding: 10
  }
});
