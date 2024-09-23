import { Component, OnInit } from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { ActivatedRoute } from '@angular/router';
import { PlayerLayoutFormComponent } from '../player-layout-form/player-layout-form.component';
import { PlayerService } from '../../../services/players/player.service';
import { IPlayerResponse } from '../../../models/PlayerModel';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
import { inputsFieldPlayer } from '../../../utils/form-inputs/form-input-player';
import { generalInputsAddress } from '../../../utils/form-inputs/form-input-address';

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
  player: IPlayerResponse = {
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
    team: 1,
    picture_profile: '',
    address: {
      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
    },
  };

  personalData: IGeneralFields[] = inputsFieldPlayer;
  addressPlayer: IGeneralFields[] = generalInputsAddress;
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
      next: (data: IPlayerResponse) => {
        this.player = data;
        console.log('PLAYER BY ID DATA', data);
      },
      error: (err) => {
        console.log('PLAYER BY ID ERR', err);
      },
    });
  }
}
