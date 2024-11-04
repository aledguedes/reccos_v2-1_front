import { IAddress } from '../generals/Address';

export interface IPlayerResponse {
  id: number;
  rg: string;
  cpf: string;
  team: number;
  name: string;
  email: string;
  status: string;
  surname: string;
  createdAt: Date;
  updatedAt: Date;
  birth_date: Date;
  position: string;
  suspended: boolean;
  picture_profile: string;
  address: IAddress;
}

export interface IPlayerRequest {
  rg: string;
  cpf: string;
  team: number;
  name: string;
  email: string;
  status: string;
  surname: string;
  createdAt: Date;
  updatedAt: Date;
  birth_date: Date;
  position: string;
  suspended: boolean;
  picture_profile: string;
  address: IAddress;
}
