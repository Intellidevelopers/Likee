import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import colors from '../components/colors';
import { StatusBar } from 'expo-status-bar';

const notifications = [
  {
    id: '1',
    text: 'Want to see the 3 women who already liked you?',
    image: require('../assets/images/user1.jpg'),
    likes: 3,
    route: 'Likes', // Route for likes screen
  },
  {
    id: '2',
    name: 'Mammie',
    text: 'Visited you',
    image: require('../assets/images/user1.jpg'),
    isNew: true,
    route: 'ChatScreen', // Route for profile screen
  },
  {
    id: '3',
    name: 'Layomi',
    text: 'Visited you',
    image: require('../assets/images/user1.jpg'),
    route: 'ChatScreen', // Route for profile screen
  },
  {
    id: '4',
    text: 'Boost your dating odds with an extra profile photo',
    image: require('../assets/images/camera.png'),
    route: 'ChatScreen', // Route for upload screen
  },
];

const Notification = ({ navigation }) => {
  const renderNotificationItem = ({ item }) => {
    const isCameraUpload = item.text === 'Boost your dating odds with an extra profile photo';

    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          isCameraUpload && styles.cameraUploadItem, // Apply different style for camera upload
        ]}
        onPress={() => navigation.navigate(item.route)} // Navigate to the assigned route
      >
        <Image
          source={item.image}
          blurRadius={isCameraUpload ? 0 : 30} // No blur for camera upload
          style={[
            styles.profileImage,
            isCameraUpload && styles.cameraImage, // Larger image for camera upload
          ]}
        />
        <View style={styles.textContainer}>
          {item.name ? (
            <Text style={styles.name}>
              {item.name} {item.isNew && <View style={styles.newIndicator} />}
            </Text>
          ) : null}
          <Text
            style={[
              styles.description,
              isCameraUpload && styles.cameraDescription, // Customize text for camera upload
            ]}
          >
            {item.text}
          </Text>
        </View>
        {item.likes ? (
          <View style={styles.likesContainer}>
            <FontAwesome name="heart" size={14} color="red" />
            <Text style={styles.likesText}>{item.likes}</Text>
          </View>
        ) : null}
        {!isCameraUpload && item.name ? (
          <MaterialIcons name="star-border" size={24} color="#000" />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.sortContainer}>
          <MaterialIcons name="sort" size={20} color="#000" />
          <Text style={styles.sortText}>Sort by</Text>
        </View>
        <StatusBar backgroundColor={colors.greyBackground} />
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 50,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    left: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  newIndicator: {
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  likesText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#000',
  },
  cameraUploadItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  cameraImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cameraDescription: {
    fontWeight: 'bold',
    color: '#555',
  },
});
