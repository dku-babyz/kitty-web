export interface User {
  id: number;
  client_id: string;
  is_active: boolean;
}

export interface UserCreate {
  client_id: string;
}
