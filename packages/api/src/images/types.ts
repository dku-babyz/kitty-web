export interface AlterImage {
  id: number;
  original_image_url: string;
  alter_image_url: string;
  site_url: string;
  client_id: string;
}

export interface AlterImageCreate {
  original_image: File;
  site_url: string;
  client_id: string;
}
