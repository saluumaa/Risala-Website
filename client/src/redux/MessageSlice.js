// src/redux/messageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../utils/apiRequest';

// Thunk to send a message
export const sendMessage = createAsyncThunk('message/sendMessage', async ({ chatId, text }) => {
  const response = await apiRequest.post(`/messages/${chatId}`, { text });
  return response.data;
});

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetMessages: (state) => {
      state.messages = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetMessages } = messageSlice.actions;

export default messageSlice.reducer;
