import ky from 'ky';
import env from '@extension/env';

const api = ky.create({
  prefixUrl: env.VITE_API_BASE_URL,
});

export default api;

export * from './users';
export * from './users/types';
export * from './words';
export * from './words/types';
export * from './images';
export * from './images/types';