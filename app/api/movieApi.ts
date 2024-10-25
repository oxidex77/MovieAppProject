// movieApi.ts
import axios from 'axios';

const API_KEY = '8099cd9eab0ba6af75d7efd7d23ddac0';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};