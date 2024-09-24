import { Component, OnInit } from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { ActivatedRoute } from '@angular/router';
import { PlayerLayoutFormComponent } from '../player-layout-form/player-layout-form.component';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
import { inputsFieldPlayer } from '../../../utils/form-inputs/form-input-player';
import { generalInputsAddress } from '../../../utils/form-inputs/form-input-address';

interface IPlayerForm {
  update: boolean;
  player_id: number;
}
@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [InputFormsComponent, PlayerLayoutFormComponent],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.scss',
})
export class PlayerEditComponent implements OnInit {
  titlePage = '';
  playerForm!: IPlayerForm;

  personalData: IGeneralFields[] = inputsFieldPlayer;
  addressPlayer: IGeneralFields[] = generalInputsAddress;
  constructor(private actvRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      this.titlePage =
        data['action'] === 'create' ? 'Novo atleta' : 'Editar Atleta';
      this.playerForm = {
        update: data['action'] === 'update',
        player_id: data['action'] === 'update' ? +data['p'] : 0,
      };
    });
  }
}
