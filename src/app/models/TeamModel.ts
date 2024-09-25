export interface ITeamResponse {
  id: number;
  name: string;
  surname: string;
  acronym: string;
  status: string;
  picture_profile?: string;
  birth_date: string;
  registered_federation: number;
  created_at: string;
  updated_at: string;
}

export interface ITeamRequest {
  name: string;
  surname: string;
  acronym: string;
  status: string;
  picture_profile?: string;
  birth_date: string;
  registered_federation: number;
}
