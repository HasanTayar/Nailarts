import axios, { AxiosInstance } from 'axios';
import { User, UserAuthResponse } from '../types/User'; // update this import according to your project structure



const api: AxiosInstance = axios.create({
  baseURL:`${import.meta.env.VITE_API_BASE_URL}`,
});

export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get<User[]>('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const response = await api.get<User>(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
}

export async function createUser(user: User): Promise<User> {
  try {
    const response = await api.post<User>('/', user);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

export async function updateUser(id: string, user: User): Promise<User> {
  try {
    const response = await api.put<User>(`/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}

export async function loginUser(email: string, password: string): Promise<UserAuthResponse> {
  try {
    const response = await api.post<UserAuthResponse>('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login user');
  }
}

export async function registerUser(user: User): Promise<UserAuthResponse> {
  try {
    const formData = new FormData();

    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    const response = await api.post<UserAuthResponse>('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
}
