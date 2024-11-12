import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    { title: '3 people liked you!', description: 'Reveal your Likes List and save time by sending messages to people who liked your profile.' },
    { title: 'New Match!', description: 'Start chatting with your new match and make a connection.' },
    { title: 'Discover Premium!', description: 'Enjoy unlimited swipes and enhanced features with Premium.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        let nextIndex = (currentIndex + 1) % data.length;
        scrollViewRef.current.scrollTo({ x: width * nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: 120,
    marginBottom: 20,
  },
  slide: {
    width: width,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#ddd',
  },
});

export default Carousel;
