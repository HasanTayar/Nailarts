import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from './index';
import { loginUser, registerUser } from '../services/userServices';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

interface AuthResponse {
  token: string | undefined;
  user: User;
}



interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

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
    loginSuccess(state, action: PayloadAction<AuthResponse>) {
      const { token, user } = action.payload;
      state.token = token as string;
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
    registerSuccess(state, action: PayloadAction<AuthResponse>) {
      const { token, user } = action.payload;
      state.token = token as string;
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
    const user: User = await loginUser(email, password);
    const token: string | undefined = process.env.REACT_APP_TOKEN;

    if (!token) {
      throw new Error('Token not found');
    }

    const authResponse: AuthResponse = { token, user };
    dispatch(loginSuccess(authResponse));
  } catch (error:any) {
    dispatch(loginFailure(error.message));
  }
};

export const register = (email: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch(registerStart());
    const user: User = await registerUser(email, password);
    const token: string | undefined = process.env.VITE_TOKEN;

    if (!token) {
      throw new Error('Token not found');
    }

    const authResponse: AuthResponse = { token, user };
    dispatch(registerSuccess(authResponse));
  } catch (error:any) {
    dispatch(registerFailure(error.message));
  }
};

  
  
  
