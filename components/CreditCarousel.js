import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CreditCarousel = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    { title: 'Get more matches', description: 'You will need 150 credits to be seen by more people in Encounters' },
    { title: 'Get to the top', description: 'Ypu will need 50 credits to move to the top in People nearby and be seen more often.' },
    { title: 'Get more messages', description: 'You will need 100 credits to let people know you are online and nearby to chat.' },
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
    color: '#000',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default CreditCarousel;
