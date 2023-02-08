import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import auth from "../../firebase/firebase.config"

const initialState = {
    email: '',
    role: '',
    isLoading: true,
    isError: false,
    error: '',
    isSuccess: false,
}


export const crateuser = createAsyncThunk('auth/createUser', async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)

    return data.user.email;
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password)

    return data;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.email = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(crateuser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ''
            })
            .addCase(crateuser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(crateuser.rejected, (state, action) => {
                state.isLoading = false;
                state.email = '';
                state.isError = true;
                state.error = action.error.message
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.email = '';
                state.isError = true;
                state.error = action.error.message
            })
    }
})

export const { logOut } = authSlice.actions;

export default authSlice.reducer