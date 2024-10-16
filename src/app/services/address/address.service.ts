import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress } from '../../models/generals/Address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  url = 'https://brasilapi.com.br/api/cep/v2';

  constructor(private http: HttpClient) {}

  getAddress(cep: string) {
    return this.http.get<IAddress>(`${this.url}/${cep}`);
  }
}
