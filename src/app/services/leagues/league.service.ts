import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILeagueRequest, ILeagueResponse } from '../../models/LeagueModel';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private url: string = environment.BASE_URL;
  private flag = 'leagues';

  constructor(private http: HttpClient) {}

  getAllLeagues(page: number, perPage: number) {
    return this.http.get<ILeagueResponse[]>(
      `${this.url}/${this.flag}?_page=${page}&_per_page=${perPage}`,
    );
  }

  getLeagueById(league_id: number) {
    return this.http.get<ILeagueResponse>(
      `${this.url}/${this.flag}/${league_id}`,
    );
  }

  updateLeague(league_id: number, form: ILeagueRequest) {
    return this.http.put<ILeagueResponse>(
      `${this.url}/${this.flag}/${league_id}`,
      JSON.stringify(form),
    );
  }

  removeLeague(league_id: number) {
    return this.http.delete<ILeagueResponse>(
      `${this.url}/${this.flag}/${league_id}`,
    );
  }
}
