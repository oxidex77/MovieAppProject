import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../components/MovieCard';
import { toggleShortlist } from '../../redux/moviesSlice';
import { RootState } from '../../redux/store';
import { Ionicons } from '@expo/vector-icons';

const ShortlistedMoviesScreen: React.FC = () => {
  const shortlistedMovies = useSelector((state: RootState) => state.movies.shortlisted);
  const allMovies = useSelector((state: RootState) => state.movies.allMovies);
  const dispatch = useDispatch();

  const shortlistedData = allMovies.filter(movie => shortlistedMovies.includes(movie.id));

  if (shortlistedData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="bookmark-outline" size={64} color="#888" />
        <Text style={styles.emptyTitle}>No Shortlisted Movies</Text>
        <Text style={styles.emptySubtitle}>
          Movies you shortlist will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Watchlist</Text>
        <Text style={styles.subTitle}>{shortlistedData.length} movies</Text>
      </View>
      <FlatList
        data={shortlistedData}
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            title={item.title}
            posterUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            isShortlisted={true}
            onShortlistToggle={() => dispatch(toggleShortlist(item.id))}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.movieGrid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    padding: 16,
    backgroundColor: '#141414',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subTitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  movieGrid: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ShortlistedMoviesScreen;