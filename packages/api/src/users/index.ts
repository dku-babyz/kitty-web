import api from '../index';
import { User, UserCreate } from './types';

export const createUser = async (user: UserCreate): Promise<User> => {
  return await api.post('users', { json: user }).json();
};

export const getUsers = async (): Promise<User[]> => {
  return await api.get('users').json();
};

export const getUser = async (clientId: string): Promise<User> => {
  return await api.get(`users/${clientId}`).json();
};
