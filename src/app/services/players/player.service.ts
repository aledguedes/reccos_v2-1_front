import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../models/PlayerModel';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private url: string = environment.BASE_URL;
  private flag = 'players';

  constructor(private http: HttpClient) {}

  getAllPlayers(page: number, perPage: number) {
    return this.http.get<Player[]>(
      `${this.url}/${this.flag}?_page=${page}&_per_page=${perPage}`,
    );
  }

  removePlayer(player_id: number) {
    return this.http.delete<Player>(`${this.url}/${this.flag}/${player_id}`);
  }
}
