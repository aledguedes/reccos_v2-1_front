import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddressService } from '../../../services/address/address.service';
import { debounceTime, switchMap } from 'rxjs';
import { IAddress } from '../../../models/Address';
import { TeamService } from '../../../services/teams/team.service';
import { ITeamRequest, ITeamResponse } from '../../../models/TeamModel';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { SelectFormsComponent } from '../../components/select-forms/select-forms.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IDataForm, IToForm } from '../../../models/GeneralForms';

@Component({
  selector: 'app-team-layout-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputFormsComponent,
    SelectFormsComponent,
    RouterLink,
  ],
  templateUrl: './team-layout-form.component.html',
  styleUrl: './team-layout-form.component.scss',
})
export class TeamLayoutFormComponent implements OnInit, OnChanges {
  @Input() toForm: IToForm = {
    update: false,
    data_id: 0,
  };
  // team!: IDataPlayer;
  // personalData: IGeneralFields[] = inputsFieldTeam;
  // addressTeam: IGeneralFields[] = generalInputsAddress;

  personalData: IGeneralFields[] = [];
  addressTeam: IGeneralFields[] = [];

  teamForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private cepService: AddressService,
  ) {}

  ngOnInit(): void {
    this.initForm(false, 0);

    if (!this.toForm.update) {
      this.teamForm
        .get('address.cep')
        ?.valueChanges.pipe(
          debounceTime(1000),
          switchMap((cep) => this.cepService.getAddress(cep)),
        )
        .subscribe((address: IAddress) => {
          this.teamForm.patchValue({
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
      this.initForm(this.toForm.update, this.toForm.data_id);
    }
  }

  initForm(update: boolean, team_id: number) {
    this.teamForm = this.fb.group({
      team: this.fb.group(this.createFormGroup(this.personalData)),
      address: this.fb.group(this.createFormGroup(this.addressTeam)),
    });
    if (update) {
      setTimeout(() => {
        this.teamById(team_id);
      }, 100);
    }
  }

  teamById(team_id: number) {
    this.teamService.getTeamById(team_id).subscribe({
      next: (data: ITeamResponse) => {
        console.log('PLAYER BY ID DATA', data);
        const { address, ...team } = data;
        this.updateData({
          address: address,
          data: team,
        });
      },
      error: (err) => {
        console.log('PLAYER BY ID ERR', err);
      },
    });
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

  updateData(data: IDataForm) {
    this.teamForm.patchValue(data);
  }

  onSubmit(): void {
    const obj: ITeamRequest = {
      id: this.toForm.data_id,
      address: this.teamForm.value.address,
      ...this.teamForm.value.player,
    };
    this.updatePlayer(this.toForm.data_id, obj);
  }

  updatePlayer(player_id: number, form: ITeamRequest) {
    this.teamService.updateTeam(player_id, form).subscribe({
      next: (data) => {
        console.log('UPDATE PLAYER BY ID DATA', data);
      },
      error: (err) => {
        console.log('UPDATE PLAYER BY ID ERR', err);
      },
    });
  }
}
