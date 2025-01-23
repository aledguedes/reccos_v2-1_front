import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IPlayerResponse } from '../../../models/entities/PlayerModel';
import { PlayerService } from '../../../services/players/player.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ButtonModule } from 'primeng/button';
import { IBreadcrumb } from '../../../models/generals/BreadcrumbModels';
import { CardModule } from 'primeng/card';
import { IListCads } from '../../../models/generals/ListCardModel';
import { ListCardsPortraitComponent } from '../../../layouts/list-cards-portrait/list-cards-portrait.component';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    RouterLink,
    BreadcrumbComponent,
    ButtonModule,
    CardModule,
    ListCardsPortraitComponent,
    ListCardsPortraitComponent,
  ],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent implements OnInit {
  baseUrl = '';
  players: IPlayerResponse[] = [];

  page = 1;
  perPage = 12;

  breadcrumb: Partial<IBreadcrumb>[] = [
    { icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Atletas' },
  ];
  cardFlags: IListCads = {
    flag: 'players',
    router: 'player-edit',
  };

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.listAllPlayers();
  }

  listAllPlayers() {
    this.playerService.getAllPlayers(this.page, this.perPage).subscribe({
      next: (data) => {
        this.players = data;
        // console.log('PLAYERS ALL', this.players);
      },
      error: (err) => {
        console.log('PLAYERS ALL ERR', err);
      },
    });
  }

  removePlayer(id_player: number) {
    this.playerService.removePlayer(id_player).subscribe({
      next: (data) => {
        // console.log('PLAYERS ALL', data);
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
