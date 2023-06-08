
import axios, { AxiosInstance } from 'axios';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/users`,
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

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const response = await api.post<User>('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login user');
  }
}

export async function registerUser(email: string, password: string): Promise<User> {
  try {
    const response = await api.post<User>('/register', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
}
