import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../components/colors';
import CreditCarousel from '../components/CreditCarousel';

const Credits = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={24} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerText}>Top-up your credits</Text>
        <View style={styles.placeholder} />
      </View>

      <CreditCarousel />

      {/* Pricing Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pricingContainer}>
        <TouchableOpacity
          style={[
            styles.pricingCard,
            selectedCard === '1 month' && styles.selectedCard,
          ]}
          onPress={() => handleSelectCard('1 month')}
        >
          <Text style={styles.pricingCardHeader}>POPULAR</Text>
          <Text style={styles.newPrice}>450</Text>
          <Text style={styles.pricingCardDuration}>credits</Text>
          <Text style={styles.oldPrice}>₦2,250</Text>
          <Text style={styles.newPrice}>₦2,000</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pricingCard,
            styles.bestValueCard,
            selectedCard === '6 months' && styles.selectedCard,
          ]}
          onPress={() => handleSelectCard('6 months')}
        >
          <Text style={styles.pricingCardHeader}>BEST VALUE</Text>
          <Text style={styles.newPrice}>3050</Text>
          <Text style={styles.pricingCardDuration}>credits</Text>
          <Text style={styles.oldPrice}>₦15,250</Text>
          <Text style={styles.newPrice}>₦6,900</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pricingCard,
            selectedCard === '3 months' && styles.selectedCard,
          ]}
          onPress={() => handleSelectCard('3 months')}
        >
          <Text style={styles.newPrice}>1350</Text>
          <Text style={styles.pricingCardDuration}>credits</Text>
          <Text style={styles.oldPrice}>₦6,750</Text>
          <Text style={styles.newPrice}>₦4,000</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.footerText}>
        Terms and Conditions
      </Text>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedCard && { backgroundColor: '#aaa' }, // Disable button if no card is selected
        ]}
        disabled={!selectedCard} // Disable button if no card is selected
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {},
  pricingContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
  },
  pricingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 130,
    height: 180,
    borderWidth: 2,
    borderColor: '#ddd',

  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#000',
  },
  pricingCardHeader: {
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 5,
    backgroundColor: '#000',
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bestValueCard: {
    backgroundColor: '#fff',
  },
  pricingCardDuration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 14,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  pricePerMonth: {
    fontSize: 12,
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  continueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  footerText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    top: -200,
    textDecorationLine: 'underline',

  },
  placeholder: {
    width: 35,
    height: 35,
    borderRadius: 10,
  },
});

export default Credits;
