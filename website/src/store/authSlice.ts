import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from './index';
import { loginUser, registerUser } from '../services/userServices';
import { User, UserAuthResponse } from '../types/User'; 
import { AuthState } from '../types/AuthState';


const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserAuthResponse>) {
      const { token, user } = action.payload;
      state.token = token || null;
      state.user = user;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<UserAuthResponse>) {
      const { token, user } = action.payload;
      state.token = token || null;
      state.user = user;
      state.loading = false;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// Async Thunks
export const login = (email: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch(loginStart());
    const authResponse: UserAuthResponse = await loginUser(email, password);
    dispatch(loginSuccess(authResponse));
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

export const register = (user: User): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch(registerStart());
    const authResponse: UserAuthResponse = await registerUser(user);
    dispatch(registerSuccess(authResponse));
  } catch (error: any) {
    dispatch(registerFailure(error.message));
  }
};
