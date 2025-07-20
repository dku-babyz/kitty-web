export interface AlterWord {
  id: number;
  original_word: string;
  alter_word: string;
  site_url: string;
  client_id: string;
}

export interface AlterWordCreate {
  original_word: string;
  site_url: string;
  client_id: string;
}
