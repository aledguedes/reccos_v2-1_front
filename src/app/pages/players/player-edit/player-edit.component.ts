import { Component, OnInit } from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { ActivatedRoute } from '@angular/router';
import { PlayerLayoutFormComponent } from '../player-layout-form/player-layout-form.component';
import { PlayerService } from '../../../services/players/player.service';
import { Player } from '../../../models/PlayerModel';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [InputFormsComponent, PlayerLayoutFormComponent],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.scss',
})
export class PlayerEditComponent implements OnInit {
  titlePage = '';
  isUpdate = false;
  player: Player = {
    id: 0,
    rg: '',
    cpf: '',
    name: '',
    email: '',
    status: '',
    surname: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    birth_date: new Date(),
    position: '',
    suspended: false,
    cod_status: '',
    picture_profile: '',
  };
  constructor(
    private actvRouter: ActivatedRoute,
    private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      this.titlePage =
        data['action'] === 'create' ? 'Novo atleta' : 'Editar Atleta';
      this.isUpdate = data['action'] === 'update';
      if (data['action'] === 'update') {
        this.playerById(+data['p']);
      }
    });
  }

  playerById(player_id: number) {
    this.playerService.getPlayerById(player_id).subscribe({
      next: (data: Player) => {
        this.player = data;
        console.log('PLAYER BY ID DATA', data);
      },
      error: (err) => {
        console.log('PLAYER BY ID ERR', err);
      },
    });
  }
}
