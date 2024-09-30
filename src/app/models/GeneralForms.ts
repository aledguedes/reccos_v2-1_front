export interface IToForm {
  update: boolean;
  data_id: number;
  flag?: string;
}

export interface IDataForm {
  data: ITeamMethod;
  address: IAddressMethod;
}

export interface IAddressMethod {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

export interface ITeamMethod {
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
