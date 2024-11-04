import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  IPlayerRequest,
  IPlayerResponse,
} from '../../models/entities/PlayerModel';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private url: string = environment.BASE_URL;
  private flag = 'players';

  constructor(private http: HttpClient) {}

  getAllPlayers(page: number, perPage: number) {
    return this.http.get<IPlayerResponse[]>(
      `${this.url}/${this.flag}?_page=${page}&_per_page=${perPage}`,
    );
  }

  getPlayerById(player_id: number) {
    return this.http.get<IPlayerResponse>(
      `${this.url}/${this.flag}/${player_id}`,
    );
  }

  updatePlayer(player_id: number, form: IPlayerRequest) {
    return this.http.put<IPlayerResponse>(
      `${this.url}/${this.flag}/${player_id}`,
      JSON.stringify(form),
    );
  }

  removePlayer(player_id: number) {
    return this.http.delete<IPlayerResponse>(
      `${this.url}/${this.flag}/${player_id}`,
    );
  }
}
