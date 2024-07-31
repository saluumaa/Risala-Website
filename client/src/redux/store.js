import {configureStore} from '@reduxjs/toolkit';
import NewsReducer from './NewsSlice';
import usersReducer from './UsersSlice';
const store = configureStore({
    reducer: {
        news: NewsReducer,
        user: usersReducer,
    }
})

export default store
