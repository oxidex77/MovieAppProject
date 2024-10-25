import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import MovieCard from '../components/MovieCard';
import { fetchMovies } from '../../api/movieApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShortlist, setMovies } from '../../redux/moviesSlice';
import { Text } from 'react-native';
import { RootState } from '../../redux/store';
import { AxiosResponse } from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get screen dimensions
const { width } = Dimensions.get('window');
const numColumns = width > 600 ? 3 : 2; // Use 3 columns for tablets

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const ListingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const shortlistedMovies = useSelector((state: RootState) => state.movies.shortlisted);

  const {
    data,
    error,
    isLoading,
    refetch
  } = useQuery<AxiosResponse<MovieApiResponse>>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (data?.data?.results) {
      dispatch(setMovies(data.data.results));
    }
  }, [data, dispatch]);

  const handleRefresh = () => {
    refetch();
  };

  const renderLoadingState = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#0066CC" />
      <Text style={styles.loadingText}>Loading Movies...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>
        Oops! Something went wrong while loading movies.
      </Text>
      <Text style={styles.retryText} onPress={handleRefresh}>
        Tap to retry
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.noMoviesText}>
        No movies available at the moment.
      </Text>
      <Text style={styles.retryText} onPress={handleRefresh}>
        Tap to refresh
      </Text>
    </View>
  );

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard
    //@ts-ignore
      movie={item}
      isShortlisted={shortlistedMovies.includes(item.id)}
      onShortlistPress={() => dispatch(toggleShortlist(item.id))}
    />
  );

  if (isLoading) {
    return renderLoadingState();
  }

  if (error) {
    return renderErrorState();
  }

  const movies = data?.data?.results || [];

  if (movies.length === 0) {
    return renderEmptyState();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.container}>
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(movie) => movie.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={['#0066CC']}
              tintColor="#0066CC"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 8,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
    marginTop: 8,
  },
  noMoviesText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default ListingScreen;