import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieState {
  allMovies: Movie[];
  shortlisted: number[];
}

const initialState: MovieState = {
  allMovies: [],
  shortlisted: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.allMovies = action.payload;
    },
    toggleShortlist: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      if (state.shortlisted.includes(movieId)) {
        state.shortlisted = state.shortlisted.filter(id => id !== movieId);
      } else {
        state.shortlisted.push(movieId);
      }
    },
  },
});

export const { setMovies, toggleShortlist } = moviesSlice.actions;
export default moviesSlice.reducer;