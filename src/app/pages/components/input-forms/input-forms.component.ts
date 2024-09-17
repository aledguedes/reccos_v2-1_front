import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inputsFieldPlayer } from '../../../utils/form-inputs/form-input-player';
import { CommonModule } from '@angular/common';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
import { generalInputsAddress } from '../../../utils/form-inputs/form-input-address';

@Component({
  selector: 'app-input-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-forms.component.html',
  styleUrl: './input-forms.component.scss',
})
export class InputFormsComponent implements OnInit {
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
