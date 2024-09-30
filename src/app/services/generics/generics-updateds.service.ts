import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FlagMap } from '../interfaces-map/interfaces-map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericsUpdatedsService {
  private url: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getById<K extends keyof FlagMap>(
    flag: K,
    flag_id: number,
  ): Observable<FlagMap[K]> {
    return this.http.get<FlagMap[K]>(`${this.url}/${flag}/${flag_id}`);
  }
}
