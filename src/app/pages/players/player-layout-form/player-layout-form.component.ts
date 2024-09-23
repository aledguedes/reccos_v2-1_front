import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { IPlayerResponse } from '../../../models/PlayerModel';

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
  @Input() update = false;
  @Input() player!: IPlayerResponse;
  @Input() personalData: IGeneralFields[] = inputsFieldPlayer;
  @Input() addressPlayer: IGeneralFields[] = generalInputsAddress;
  playerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cepService: AddressService,
  ) {}

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      player: this.fb.group(this.createFormGroup(this.personalData)),
      address: this.fb.group(this.createFormGroup(this.addressPlayer)),
    });

    this.playerForm.controls['address.street']?.disable();
    this.playerForm.controls['address.neighborhood']?.disable();
    this.playerForm.controls['address.city']?.disable();
    this.playerForm.controls['address.state']?.disable();

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
        this.playerForm.get('address.street')?.enable();
        this.playerForm.get('address.neighborhood')?.enable();
        this.playerForm.get('address.city')?.enable();
        this.playerForm.get('address.state')?.enable();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.update) {
      this.updateDataPlayer(changes['player'].currentValue);
      console.log('ON CHANGES', changes, this.update);
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
    console.log(this.playerForm.value);
  }

  convertDateToISO(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString();
  }

  updateDataPlayer(data: IPlayerResponse) {
    const keys = Object.keys(data) as (keyof IPlayerResponse)[];
    const keysAddress = Object.keys(data.address) as (keyof IAddress)[];

    this.personalData.forEach((p: IGeneralFields) => {
      keys.forEach((k) => {
        if (p.inputFieldName === k) {
          p.initialValues = data[k];
        }
      });
    });

    this.addressPlayer.forEach((p: IGeneralFields) => {
      keysAddress.forEach((k) => {
        if (p.inputFieldName === k) {
          p.initialValues = data.address[k];
        }
      });
    });
  }
}
