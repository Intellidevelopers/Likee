import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import userProfileStore from '../stores/userProfileStore';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../components/colors";
import { BellIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import { datesData } from '../components/datesData'; // Import NearbyData
import { Ionicons, MaterialIcons, FontAwesome, SimpleLineIcons, Octicons } from '@expo/vector-icons';



import {
  user1,
  user2,
  user3,
} from "../assets/images";

const { width, height } = Dimensions.get('window');
const HomeScreen = () => {
  const setUserProfile = userProfileStore((state) => state.setUserProfile);
  const navigation = useNavigation();

  const handleClick = (item) => {
    setUserProfile(item); // This will include name, age, bio, imgPath, etc.
    navigation.navigate("UserProfile"); // Navigate to UserProfile screen
  };

  // Example data for the swiper


  // Render each card item
  const renderCard = (item) => (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image source={item.imgPath} style={styles.image} resizeMode="cover" />
      </TouchableWithoutFeedback>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]}
        style={styles.gradientOverlay}
        start={{ x: 0.5, y: 0.2 }}
        end={{ x: 0.5, y: 1 }}
      />

      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {item.name}, {item.age}
          </Text>
          <CheckBadgeIcon size={22} color="#3B82F6" style={styles.badgeIcon} />
        </View>
        <Text style={styles.locationText}>{item.distance}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={user1}
            style={styles.profileImage}
          />
        </View>

        <View>
          <Text style={styles.headerTitle}>MATCH ARENAL</Text>
        </View>

        <View style={styles.bellIconContainer}>
          <TouchableOpacity>
            <Octicons name='bell-fill' size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.carouselContainer}>
      <Swiper
        cards={datesData}
        renderCard={renderCard}
        stackSize={3}
        cardIndex={0}
        backgroundColor="transparent"
        infinite
        verticalSwipe={false}
        onSwipedLeft={() => console.log('Swiped Left')}
        onSwipedRight={() => console.log('Swiped Right')}
        onSwipedTop={() => console.log('Swiped Up')}
        onSwipedBottom={() => console.log('Swiped Down')}
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'red',
                color: 'white',
                fontSize: 24,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: -20,
              },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: colors.success,
                color: 'white',
                fontSize: 24,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: 20,
              },
            },
          },
        }}
      />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.greyBackground,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    width: width * 0.9,
    height: height * 0.75,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 4,
  },
  badgeIcon: {
    marginLeft: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#d1d5db',
    fontWeight: '300',
    marginTop: 5,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: "hidden",
    width: hp(5),
    height: hp(5),
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    color: colors.primaryDark, // Blue for a modern, clean touch
    textTransform: "uppercase",
  },
  bellIconContainer: {
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    top: 0,
    bottom: 0,
    width: width * 1, // Adjust width to ensure the carousel is centered
    height: height * 0.65, // Adjust height to prevent overflow
    marginBottom: 0, // Create space between carousel and bottom tabs
    alignSelf: 'center', // Ensures the carousel is centered horizontally
    top: -50
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F26322",
    marginLeft: 16,
    marginBottom: 10,
    marginTop: 20
  },
});
