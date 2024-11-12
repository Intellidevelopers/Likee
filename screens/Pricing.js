import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from '../components/Carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Pricing = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={24} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.headerText}>Premium</Text>
        <View style={styles.placeholder} />
      </View>

      <Carousel />

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
          <Text style={styles.pricingCardDuration}>1 month</Text>
          <Text style={styles.oldPrice}>₦6,428</Text>
          <Text style={styles.newPrice}>₦2,900</Text>
          <Text style={styles.pricePerMonth}>₦2,900.00/mth</Text>
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
          <Text style={styles.pricingCardDuration}>6 months</Text>
          <Text style={styles.oldPrice}>₦38,571</Text>
          <Text style={styles.newPrice}>₦9,900</Text>
          <Text style={styles.pricePerMonth}>₦1,650.00/mth</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pricingCard,
            selectedCard === '3 months' && styles.selectedCard,
          ]}
          onPress={() => handleSelectCard('3 months')}
        >
          <Text style={styles.pricingCardHeader}>3 months</Text>
          <Text style={styles.oldPrice}>₦19,285</Text>
          <Text style={styles.newPrice}>₦5,900</Text>
          <Text style={styles.pricePerMonth}>₦1,966.67/mth</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.footerText}>
        Your payment account will be charged ₦{selectedCard === '1 month' ? '2,900.00' : selectedCard === '6 months' ? '9,900.00' : '5,900.00'} for {selectedCard || '1 month'} MatchArenal Premium. Cancel anytime. For instructions on how to cancel, visit our FAQs page. Bonus credits percentage may change for future credit purchases. Terms & Conditions.
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
    backgroundColor: '#2e1b1e',
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
    backgroundColor: '#554043',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 130,
    height: 180,

  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  pricingCardHeader: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    marginBottom: 5,
    backgroundColor: '#fff',
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bestValueCard: {
    backgroundColor: '#554043',
  },
  pricingCardDuration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    fontSize: 14,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  pricePerMonth: {
    fontSize: 12,
    color: '#aaa',
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  continueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
    color: '#fff',
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    top: -150,
  },
  placeholder: {
    width: 35,
    height: 35,
    borderRadius: 10,
  },
});

export default Pricing;
