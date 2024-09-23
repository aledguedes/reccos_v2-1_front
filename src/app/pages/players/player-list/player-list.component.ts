import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IPlayerResponse } from '../../../models/PlayerModel';
import { PlayerService } from '../../../services/players/player.service';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent implements OnInit {
  baseUrl = '';
  players: IPlayerResponse[] = [];

  page = 1;
  perPage = 12;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.listAllPlayers();
  }

  listAllPlayers() {
    this.playerService.getAllPlayers(this.page, this.perPage).subscribe({
      next: (data) => {
        this.players = data;
        console.log('PLAYERS ALL', this.players);
      },
      error: (err) => {
        console.log('PLAYERS ALL ERR', err);
      },
    });
  }

  removePlayer(id_player: number) {
    this.playerService.removePlayer(id_player).subscribe({
      next: (data) => {
        console.log('PLAYERS ALL', data);
        this.listAllPlayers();
      },
      error: (err) => {
        console.log('PLAYERS REMOVE ERR', err);
      },
    });
  }

  plotStatus(value: string) {
    switch (value) {
      case 'ativo':
        return '1';
      case 'inativo':
        return '2';
      case 'suspenso':
        return '3';
      default:
        return '4';
    }
  }
}
