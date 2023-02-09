import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import auth from "../../firebase/firebase.config"

const initialState = {
    email: '',
    role: '',
    isLoading: true,
    isError: false,
    error: '',
    isSuccess: false,
}

// create user using email and password
export const crateuser = createAsyncThunk('auth/createUser', async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)
    return data.user.email;
})
// email password login

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password)
    return data.user.email;
})

// google login
export const googleLogin = createAsyncThunk('auth/googleLogin', async () => {

    const googleProvider = new GoogleAuthProvider()
    const data = await signInWithPopup(auth, googleProvider)
    return data.user.email;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.email = ''
        },
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.isLoading = false
        },

        toggleLoading: (state, action) => {
            state.isLoading = false
        },

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
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ''
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.email = '';
                state.isError = true;
                state.error = action.error.message
            });
    }
})

export const { logOut, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer