import { createSlice } from '@reduxjs/toolkit'; // Corrected import statement

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { // Fixed 'reducer' to 'reducers'
        setUser: (state, action) => {
            state.user = action.payload; // Set the user data
            state.isAuthenticated = !!action.payload; // Update authentication status
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload; // Update loading state
        },
        logout: (state) => {
            state.user = null; // Clear user data on logout
            state.isAuthenticated = false; // Set authentication status to false
        },
    },
});

export const { setUser, setLoading, logout } = authSlice.actions; // Export actions
export default authSlice.reducer; // Export the reducer
