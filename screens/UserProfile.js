import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable, Linking } from "react-native";
import React, { useState } from "react";
import userProfileStore from '../stores/userProfileStore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { CameraIcon } from "react-native-heroicons/outline";
import colors from "../components/colors";
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

export default function UserProfile({ navigation }) { // Ensure navigation prop is received
  const { userProfile } = userProfileStore(); // Access user profile from Zustand store
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  
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
<GestureHandlerRootView>
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
          <View style={styles.section}>
            <Text style={styles.bioHeader}>BIO</Text>
            <Text style={styles.bioText}>{userProfile.bio}</Text>
          </View>

          <View style={styles.infoContainer2}>
          <Text style={styles.bioHeader}>More about me</Text>
            <View style={styles.infoContainerRow}>
              <View style={styles.info}>
                <MaterialCommunityIcons name="baby-face" size={18}/>
                <Text style={styles.infoText}>{userProfile.kids}</Text>
              </View>

              <View style={styles.info}>
                <MaterialCommunityIcons name="cigar" size={18}/>
                <Text style={styles.infoText}>{userProfile.smoking}</Text>
              </View>

              <View style={styles.info}>
                <MaterialCommunityIcons name="glass-wine" size={18}/>
                <Text style={styles.infoText}>{userProfile.drinking}</Text>
              </View>

              <View style={styles.info}>
                <FontAwesome name="graduation-cap" size={18}/>
                <Text style={styles.infoText}>{userProfile.education}</Text>
              </View>

              <View style={styles.info}>
                <MaterialCommunityIcons name="hand-clap" size={18}/>
                <Text style={styles.infoText}>{userProfile.religion}</Text>
              </View>
            </View>

            <Text style={styles.bioHeader}>My relationship basics</Text>
            <View style={styles.infoContainerRow}>
              <View style={styles.info}>
                <AntDesign name="heart"/>
                <Text style={styles.infoText}>{userProfile.personality}</Text>
              </View>

              <View style={styles.info}>
                <MaterialCommunityIcons name="gender-male-female" size={18}/>
                <Text style={styles.infoText}>{userProfile.sexuality}</Text>
              </View>

              <View style={styles.info}>
                <AntDesign name="heart"/>
                <Text style={styles.infoText}>{userProfile.education}</Text>
              </View>
            </View>

            <Text style={styles.bioHeader}>Language i know</Text>
            <View style={styles.infoContainerRow}>
            {userProfile.language?.map((language, index) => (
              <View key={index} style={styles.info}>
                <Text style={styles.infoText}>{language}</Text>
              </View>
            ))}
          </View>
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
            <View>
              <Text style={styles.bioHeader}>Star sign</Text>
              <Text style={styles.label}>{userProfile.starSign}</Text>
            </View>

            <View>
              <Text style={styles.bioHeader}>Education</Text>
              <Text style={styles.label}>{userProfile.education}</Text>
            </View>

          <View>
            <Text style={styles.bioHeader}>Location</Text>
            <Text style={styles.label}>{userProfile.location}</Text>
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
        
        <View style={styles.verifyContainer}>
          <View style={styles.profileBadegContainer}>
            <Image source={userProfile.imageUrl} style={styles.userPic}/>
            <View style={styles.badge}>
              <MaterialIcons name="verified" color={colors.Badge} size={20}/>
            </View>
          </View>
          <Text style={styles.nameVerifiedText}>{userProfile.name} photo is verified</Text>
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
</GestureHandlerRootView>
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
    padding: wp(2),
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
    backgroundColor: colors.label,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 20,
  },
  hobbyText: {
    color: colors.primary,
    fontWeight: '500'
  },
  bioHeader: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#777',
    marginBottom: 4,
  },
  bioText: {
    fontSize: hp(2.1),
    color: '#000',
    fontWeight: '700'
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
    padding: wp(3),
    borderRadius: 20,
    marginVertical: hp(2),
  },
  infoContainer2:{
    borderRadius: 20,
    marginVertical: hp(2),
  },

  // Header for each info section


  // General text style for info content
  infoText: {
    fontSize: hp(2),
    color: '#000',
    lineHeight: hp(2.5),
    fontWeight: '700'
  },

  // Section title style for larger titles (like "Interests")
  sectionTitle: {
    fontSize: hp(2),
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
    marginBottom: hp(3),
    flexWrap: 'wrap',
    gap: 10
  },
  msgBtn:{
    backgroundColor: '#22426A',
    borderRadius: 30,
    color: '#fff',
    padding: 10
  },
  section:{
    marginBottom: 20
  },
  info:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.label,
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 15,
    marginBottom: 1
  },
  label:{
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20
  },
  buttonsContainer:{
    flexDirection: 'row',
    justifyContent:'space-evenly',
    paddingHorizontal: wp(3),
    alignItems: 'center'
  },
  button:{
    backgroundColor: colors.label,
    padding: 10,
    borderRadius: 30
  },
  userPic:{
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 10
  },
  verifyContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: wp(3),
    marginTop: 40
  },
  nameVerifiedText:{
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginLeft: 5
  },
  profileBadegContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  badge:{
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: 20
  }
});
