import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  IRefreeRequest,
  IRefreeResponse,
} from '../../models/entities/RefreeModel';

@Injectable({
  providedIn: 'root',
})
export class RefreeService {
  private url: string = environment.BASE_URL;
  private flag = 'refrees';

  constructor(private http: HttpClient) {}

  getAllRefrees(page: number, perPage: number) {
    return this.http.get<IRefreeResponse[]>(
      `${this.url}/${this.flag}?_page=${page}&_per_page=${perPage}`,
    );
  }

  getRefreeById(refree_id: number) {
    return this.http.get<IRefreeResponse>(
      `${this.url}/${this.flag}/${refree_id}`,
    );
  }

  updateRefree(refree_id: number, form: IRefreeRequest) {
    return this.http.put<IRefreeResponse>(
      `${this.url}/${this.flag}/${refree_id}`,
      JSON.stringify(form),
    );
  }

  removeRefree(refree_id: number) {
    return this.http.delete<IRefreeResponse>(
      `${this.url}/${this.flag}/${refree_id}`,
    );
  }
}
