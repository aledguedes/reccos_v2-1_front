export interface ICoordinates {
  longitude: string;
  latitude: string;
}

export interface Location {
  type: string;
  coordinates: ICoordinates;
}

export interface IAddress {
  cep: string;
  state: string;
  city: string;
  neighborhood: string; // bairro
  street: string;
  service?: string;
  location?: Location;
}
// https://brasilapi.com.br/api/cep/v2/{cep}
