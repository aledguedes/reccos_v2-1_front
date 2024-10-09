import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IFederationRequest,
  IFederationResponse,
} from '../../models/FederationModel';

@Injectable({
  providedIn: 'root',
})
export class FederationService {
  private url: string = environment.BASE_URL;
  private flag = 'federations';

  constructor(private http: HttpClient) {}

  getAllFederations(page: number, perPage: number) {
    return this.http.get<IFederationResponse[]>(
      `${this.url}/${this.flag}?_page=${page}&_per_page=${perPage}`,
    );
  }

  getFederationById(federation_id: number) {
    return this.http.get<IFederationResponse>(
      `${this.url}/${this.flag}/${federation_id}`,
    );
  }

  updateFederation(federation_id: number, form: IFederationRequest) {
    return this.http.put<IFederationResponse>(
      `${this.url}/${this.flag}/${federation_id}`,
      JSON.stringify(form),
    );
  }

  removeFederation(federation_id: number) {
    return this.http.delete<IFederationResponse>(
      `${this.url}/${this.flag}/${federation_id}`,
    );
  }
}
