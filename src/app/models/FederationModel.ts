export interface IFederationResponse {
  id: number;
  name: string;
  surname: string;
  status: string;
  img_logo?: string;
  created_at: string;
  updated_at: string;
  users_id?: number;
}

export interface IFederationRequest {
  name: string;
  surname: string;
  status: string;
  img_logo?: string;
  created_at: string;
  updated_at: string;
  users_id?: number;
}
