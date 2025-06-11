import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: "", isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;

        },
        logout(state) {
            state.isLoggedIn = false;
        }
    },
});
export const authAction = authSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer, // Use 'auth' as the key instead of 'reducer'
    },
});
