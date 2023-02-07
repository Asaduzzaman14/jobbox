import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword } from "firebase/auth"


const initialState = {
    email: '',
    role: '',
    isLoading: true,
    isError: false,
    error: '',
    isSuccess: false,
}

const crateuser = createAsyncThunk('authetication/create_user', async ({ auth, email, pass }) => {

    const data = await createUserWithEmailAndPassword(auth, email, pass)
    return data;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
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
    }
})

export default authSlice.reducer