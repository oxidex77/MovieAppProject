import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MovieCardProps {
  title: string;
  posterUrl: string;
  isShortlisted: boolean;
  onShortlistToggle: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterUrl,
  isShortlisted,
  onShortlistToggle,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      <View style={styles.overlay} />
      <TouchableOpacity style={styles.shortlistButton} onPress={onShortlistToggle}>
        <Ionicons
          name={isShortlisted ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={isShortlisted ? '#FFD700' : '#fff'}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 280,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },
  shortlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
export default MovieCard;