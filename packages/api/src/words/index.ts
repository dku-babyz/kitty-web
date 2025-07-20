import api from '../index';
import { AlterWord, AlterWordCreate } from './types';

export const createAlterWord = async (word: AlterWordCreate): Promise<AlterWord> => {
  return await api.post('words', { json: word }).json();
};
