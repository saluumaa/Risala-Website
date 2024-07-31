import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiRequest from '../utils/apiRequest';
import { getToken } from '../utils/localStorage';

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

// Create news - only admin
export const createNews = createAsyncThunk(
  'news/createNews',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { currentUser } = getState().user;
      if (!currentUser || !currentUser.isAdmin) {
        throw new Error('Only admins can create news');
      }

      const token = getToken();
      if (!token) {
        throw new Error('User is not authenticated. Authentication token not found.');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post('http://localhost:3000/api/v1/news', formData, { headers });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete news - only admin
export const eraseNews = createAsyncThunk(
  'news/eraseNews',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { currentUser } = getState().user;
      if (!currentUser || !currentUser.isAdmin) {
        throw new Error('Only admins can delete news');
      }

      const token = getToken();
      if (!token) {
        throw new Error('User is not authenticated. Authentication token not found.');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.delete(`http://localhost:3000/api/v1/news/${id}`, { headers });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update news - only admin
export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const { currentUser } = getState().user;
      if (!currentUser || !currentUser.isAdmin) {
        throw new Error('Only admins can update news');
      }

      const token = getToken();
      if (!token) {
        throw new Error('User is not authenticated. Authentication token not found.');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.put(`http://localhost:3000/api/v1/news/${id}`, formData, { headers });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      .addCase(createNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.news.push(action.payload);
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(eraseNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(eraseNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.news = state.news.filter((item) => item.id !== action.payload);
      })
      .addCase(eraseNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.news.findIndex((news) => news.id === action.payload.id);
        if (index !== -1) {
          state.news[index] = action.payload;
        }
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
