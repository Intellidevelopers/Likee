import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import useChatStore from '../stores/useChatStore'; // Assuming you're using Zustand
import { Ionicons } from '@expo/vector-icons';

const UserListScreen = ({ navigation }) => {
  const { setSelectedUser } = useChatStore();

  // Dummy user data (Replace with data from your backend or state)
  const users = [
    { id: '1', name: 'Alice', imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Bob', imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '3', name: 'Charlie', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '4', name: 'Diana', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];

  const handleUserSelect = (user) => {
    setSelectedUser(user); // Save the selected user in your state
    navigation.navigate('ChatScreen', { userId: user.id }); // Navigate to the chat screen
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleUserSelect(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userSubtitle}>Tap to start a chat</Text>
      </View>
      <Ionicons name="chatbubbles-outline" size={20} color="gray" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a User</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userSubtitle: {
    fontSize: 12,
    color: 'gray',
  },
});
