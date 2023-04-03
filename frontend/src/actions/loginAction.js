import {createAsyncThunk} from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const login = createAsyncThunk(
    "auth/login",
    async({email, password}) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const {user} = userCredential;

        // fetch custom claims from firebase and update user
        // type in redux state
        const tokenResult = await user.getIdTokenResult();
        const {admin, tutor, student} = tokenResult.claims;
        return{
            uid: user.uid,
            email: user.email,
            isAdmin: admin || false,
            isTutor: tutor || false,
            isStudent: student || false,
        };
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
});

export default authSlice.reducer;