export interface IRefereeResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  status: string;
  picture_profile?: string;
  birth_date: string;
  registered_federation: number;
  cpf: string;
  rg: string;
  created_at: string;
  updated_at: string;
  federations_id?: number;
}

export interface IRefereeRequest {
  name: string;
  surname: string;
  email: string;
  status: string;
  picture_profile?: string;
  birth_date: string;
  registered_federation: number;
  cpf: string;
  rg: string;
  federations_id?: number;
}
