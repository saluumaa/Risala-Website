import {configureStore} from '@reduxjs/toolkit';
import NewsReducer from './NewsSlice';
import usersReducer from './UsersSlice';
import chatReducer from './ChatSlice';
import messageReducer from './MessageSlice';
const store = configureStore({
    reducer: {
        news: NewsReducer,
        user: usersReducer,
        chat: chatReducer,
        message: messageReducer,
    }
})

export default store
