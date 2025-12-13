import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../utils/apiRequest';


const initialState = {
  news: [],
  loading: false,
  error: null,
};

// Fetch all news
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  try {
    const response = await apiRequest.get('/news');
    return response.data;
  } catch (error) {
    throw error;
  }
});



const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
  },
});

export default newsSlice.reducer;
