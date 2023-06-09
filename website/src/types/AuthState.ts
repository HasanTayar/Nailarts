import {User} from './User';
export interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
  }