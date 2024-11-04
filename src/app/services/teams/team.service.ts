import { Injectable } from '@angular/core';
import { ITeamRequest, ITeamResponse } from '../../models/entities/TeamModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private url: string = environment.BASE_URL;
  private flag = 'teams';

  constructor(private http: HttpClient) {}

  getAllTeams(page: number, perPage: number) {
    return this.http.get<ITeamResponse[]>(
      `${this.url}/${this.flag}?_page=${page}&_per_page=${perPage}`,
    );
  }

  getTeamById(team_id: number) {
    return this.http.get<ITeamResponse>(`${this.url}/${this.flag}/${team_id}`);
  }

  updateTeam(team_id: number, form: ITeamRequest) {
    return this.http.put<ITeamResponse>(
      `${this.url}/${this.flag}/${team_id}`,
      JSON.stringify(form),
    );
  }

  removeTeam(team_id: number) {
    return this.http.delete<ITeamResponse>(
      `${this.url}/${this.flag}/${team_id}`,
    );
  }
}
