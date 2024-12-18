import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons

const Airdrop = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdrawal</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="wallet-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Select the withdrawal type</Text>

      {/* Options */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.option}>
          <View style={styles.iconContainer}>
            <Ionicons name="business-outline" size={28} color="#fff" />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Bank Account</Text>
            <Text style={styles.optionSubText}>
              unfortunately we don’t know where to send your money
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <View style={[styles.iconContainer, { backgroundColor: '#FF5A87' }]}>
            <Ionicons name="card-outline" size={28} color="#fff" />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Card</Text>
            <Text style={styles.optionSubText}>
              unfortunately we don’t know where to send your money
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Airdrop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2630',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 40
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  optionContainer: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A3240',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#6C63FF',
    padding: 10,
    borderRadius: 8,
  },
  optionContent: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  optionSubText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
});
