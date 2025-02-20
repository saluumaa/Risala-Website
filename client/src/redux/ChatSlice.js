// src/redux/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../utils/apiRequest';

// Thunk to fetch chat
export const fetchChat = createAsyncThunk('chat/fetchChat', async (id) => {
  const response = await apiRequest.get(`/chats/${id}`);
  console.log('Chat:', response.data);
  return response.data;
});

// Thunk to create a new chat
export const createChat = createAsyncThunk('chat/createChat', async (receiverId) => {
  const response = await apiRequest.post('/chats', { receiverId });
  return response.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chat: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetChat: (state) => {
      state.chat = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chat = action.payload;
      })
      .addCase(fetchChat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chat = action.payload;
      });
  },
});

export const { resetChat } = chatSlice.actions;

export default chatSlice.reducer;
