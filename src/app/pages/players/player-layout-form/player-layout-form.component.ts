import { Component, OnInit } from '@angular/core';
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
export class PlayerLayoutFormComponent implements OnInit {
  playerForm!: FormGroup;
  personalData: IGeneralFields[] = inputsFieldPlayer;
  addressPlayer: IGeneralFields[] = generalInputsAddress;

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
}
