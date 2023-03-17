import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import auth from "../../firebase/firebase.config"

const initialState = {
    user: { email: '', role: '' },
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

export const getUser = createAsyncThunk(
    'auth/getUser', async (email) => {
        console.log(email, 'this is email');
        const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`)
        const data = await res.json()
        return data.data


        // if (data.email) {
        //     console.log(data);
        //     return data;
        // }

        // return email
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
            state.user.email = ''
        },
        setUser: (state, action) => {
            state.user.email = action.payload.email;
            state.isLoading = false
        },

        toggleLoading: (state) => {
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
                state.user.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(crateuser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
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
                state.user.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
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
                state.user.email = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.isError = true;
                state.error = action.error.message
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ''
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isError = false;
                state.error = ''
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.isError = true;
                state.error = action.error.message
            })


        // .addCase(getUser.pending, (state, action) => {
        //     state.isLoading = true;
        //     state.isError = false;
        //     state.error = ''
        // })
        // .addCase(getUser.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.user = action.payload.data;
        //     if (action.payload.status) {
        //     } else {
        //         state.user.email = action.payload
        //     }
        //     state.isError = false;
        //     state.error = ''
        // })
        // .addCase(getUser.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.user.email = '';
        //     state.isError = true;
        //     state.error = action.error.message
        // })
    }
})
export const { logOut, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer
