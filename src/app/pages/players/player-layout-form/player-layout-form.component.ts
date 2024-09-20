import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
import { inputsFieldPlayer } from '../../../utils/form-inputs/form-input-player';
import { generalInputsAddress } from '../../../utils/form-inputs/form-input-address';
import { CommonModule } from '@angular/common';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';

@Component({
  selector: 'app-player-layout-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputFormsComponent],
  templateUrl: './player-layout-form.component.html',
  styleUrl: './player-layout-form.component.scss',
})
export class PlayerLayoutFormComponent implements OnInit {
  playerForm!: FormGroup;
  personalData: IGeneralFields[] = inputsFieldPlayer;
  addressPlayer: IGeneralFields[] = generalInputsAddress;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      player: this.fb.group(this.createFormGroup(this.personalData)),
      address: this.fb.group(this.createFormGroup(this.addressPlayer)),
    });

    console.log('FORM GROUP', this.personalData);
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
}
