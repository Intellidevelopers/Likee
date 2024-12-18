import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AudioPlayer = ({ isPlaying, onPlayPause }) => (
  <TouchableOpacity onPress={onPlayPause} style={styles.audioContainer}>
    <Ionicons
      name={isPlaying ? 'pause-circle' : 'play-circle'}
      size={30}
      color="#1E90FF"
    />
    <Text style={styles.audioText}>
      {isPlaying ? 'Pause' : 'Play'} Voice Message
    </Text>
  </TouchableOpacity>
);

export default React.memo(AudioPlayer);

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  audioText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
