import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress } from '../../models/Address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  url = 'https://brasilapi.com.br/api/cep/v2';

  constructor(private http: HttpClient) {}

  getAddress(cep: string) {
    console.log('SERVICE CEP', cep);
    return this.http.get<IAddress>(`${this.url}/${cep}`);
  }
}
