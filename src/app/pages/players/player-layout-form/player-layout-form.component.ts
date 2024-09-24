import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
import { inputsFieldPlayer } from '../../../utils/form-inputs/form-input-player';
import { generalInputsAddress } from '../../../utils/form-inputs/form-input-address';
import { CommonModule } from '@angular/common';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { SelectFormsComponent } from '../../components/select-forms/select-forms.component';
import { debounceTime, switchMap } from 'rxjs';
import { AddressService } from '../../../services/address/address.service';
import { IAddress } from '../../../models/Address';
import { PlayerService } from '../../../services/players/player.service';
import { IPlayerRequest, IPlayerResponse } from '../../../models/PlayerModel';

interface IPlayerForm {
  update: boolean;
  player_id: number;
}

interface IDataPlayer {
  player: IPlayerMethod;
  address: IAddressMethod;
}
interface IPlayerMethod {
  rg: string;
  cpf: string;
  team: number;
  name: string;
  email: string;
  status: string;
  surname: string;
  birth_date: Date;
  position: string;
  picture_profile: string;
}

interface IAddressMethod {
  cep: string;
  state: string;
  city: string;
  neighborhood: string; // bairro
  street: string;
}
@Component({
  selector: 'app-player-layout-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputFormsComponent,
    SelectFormsComponent,
  ],
  templateUrl: './player-layout-form.component.html',
  styleUrl: './player-layout-form.component.scss',
})
export class PlayerLayoutFormComponent implements OnInit, OnChanges {
  @Input() toForm: IPlayerForm = {
    update: false,
    player_id: 0,
  };
  player!: IDataPlayer;
  personalData: IGeneralFields[] = inputsFieldPlayer;
  addressPlayer: IGeneralFields[] = generalInputsAddress;
  playerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cepService: AddressService,
    private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.initForm(false, 0);

    if (!this.toForm.update) {
      this.playerForm
        .get('address.cep')
        ?.valueChanges.pipe(
          debounceTime(1000),
          switchMap((cep) => this.cepService.getAddress(cep)),
        )
        .subscribe((address: IAddress) => {
          this.playerForm.patchValue({
            address: {
              street: address.street,
              city: address.city,
              state: address.state,
              neighborhood: address.neighborhood,
            },
          });
        });
    }
  }

  ngOnChanges(): void {
    if (this.toForm.update) {
      this.initForm(this.toForm.update, this.toForm.player_id);
    }
  }

  initForm(update: boolean, player_id: number) {
    this.playerForm = this.fb.group({
      player: this.fb.group(this.createFormGroup(this.personalData)),
      address: this.fb.group(this.createFormGroup(this.addressPlayer)),
    });
    if (update) {
      setTimeout(() => {
        this.playerById(player_id);
      }, 100);
    }
  }

  createFormGroup(data: IGeneralFields[]): Record<string, unknown> {
    const group: Record<string, unknown> = {};

    data.forEach((fieldset: IGeneralFields) => {
      group[fieldset.inputFieldName] = [
        fieldset.initialValues,
        fieldset.validators || [],
      ];
    });

    return group;
  }

  onSubmit(): void {
    const obj: IPlayerRequest = {
      id: this.toForm.player_id,
      address: this.playerForm.value.address,
      ...this.playerForm.value.player,
    };
    this.updatePlayer(this.toForm.player_id, obj);
  }

  updatePlayer(player_id: number, form: IPlayerRequest) {
    this.playerService.updatePlayer(player_id, form).subscribe({
      next: (data) => {
        console.log('UPDATE PLAYER BY ID DATA', data);
      },
      error: (err) => {
        console.log('UPDATE PLAYER BY ID ERR', err);
      },
    });
  }

  convertDateToISO(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString();
  }

  playerById(player_id: number) {
    this.playerService.getPlayerById(player_id).subscribe({
      next: (data: IPlayerResponse) => {
        // console.log('PLAYER BY ID DATA', data);
        const { address, ...player } = data;
        this.updateDataPlayer({
          address: address,
          player: player,
        });
      },
      error: (err) => {
        console.log('PLAYER BY ID ERR', err);
      },
    });
  }

  updateDataPlayer(data: IDataPlayer) {
    this.playerForm.patchValue(data);
  }
}
