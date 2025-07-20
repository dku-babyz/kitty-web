import api from '../index';
import { AlterImage, AlterImageCreate } from './types';

export const createAlterImage = async (image: AlterImageCreate): Promise<AlterImage> => {
  const formData = new FormData();
  formData.append('client_id', image.client_id);
  formData.append('site_url', image.site_url);
  formData.append('original_image', image.original_image);

  return await api.post('images', { body: formData }).json();
};
