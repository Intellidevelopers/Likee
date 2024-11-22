import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBadgeIcon } from 'react-native-heroicons/solid';
import { Ionicons, Octicons } from '@expo/vector-icons';
import userProfileStore from '../stores/userProfileStore';
import { useNavigation } from '@react-navigation/native';
import { datesData } from '../components/datesData';
import { user1 } from "../assets/images";
import colors from '../components/colors';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  
  const setUserProfile = userProfileStore((state) => state.setUserProfile);
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const combinedData = [...datesData, ...datesData]; // Duplicate data for seamless scrolling

  const handleClick = (item) => {
    setUserProfile(item);
    navigation.navigate("UserProfile");
  };

  const handleLike = (index) => {
    console.log(`Liked item at index: ${index}`);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (index + 1) * width,
        animated: true,
      });
    }
  };

  useEffect(() => {
    // Add an event listener to reset the scroll position when reaching the end
    scrollX.addListener(({ value }) => {
      if (value >= (datesData.length * width)) {
        scrollViewRef.current.scrollTo({ x: 0, animated: false });
      }
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [scrollX]);

  const renderCard = (item, index) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp'
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View
        key={index}
        style={[styles.cardContainer, { transform: [{ scale }], opacity }]}
      >
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
            <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(index)}>
              <Ionicons name="heart-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.locationText}>{item.distance}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.context}>
          <View style={styles.profileImageContainer}>
            <Image source={user1} style={styles.profileImage} />
          </View>
          <View style={styles.info}>
            <Text style={styles.headerTitle}>Mammie</Text>
            <Text style={styles.subheaderText}>Good afternoon!</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Octicons name='bell-fill' size={24} color="#000" />
        </TouchableOpacity>

      </View>

      <View style={styles.carouselContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {combinedData.map((item, index) => renderCard(item, index))}
        </Animated.ScrollView>
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
    backgroundColor: colors.white, // Sample background color
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 15,
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: "hidden",
    width: 50,
    height: 50,
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
    color: "#333",
  },
  bellIconContainer: {
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    width: width,
    height: height * 0.90,
    marginBottom: 10,
    top: -10,
  },
  cardContainer: {
    width: width * 0.9,
    height: height * 0.80,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: width * 0.05,
    marginBottom: 20,
    alignSelf: 'center',
    position: 'relative',
    top: -5
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
    marginTop: -10,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    left: 90,
    top: 15
  },
  context:{
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subheaderText:{
    fontSize: 14,
    color: '#555',
  },
  info:{
    left: 10
  }
});
