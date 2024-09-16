import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inputsFieldPlayer } from '../../../utils/form-inputs/fomr-input-player';
import { IInputFieldPlayer } from '../../../models/inputFields/InputsPlayer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-forms.component.html',
  styleUrl: './input-forms.component.scss',
})
export class InputFormsComponent implements OnInit {
  playerForm!: FormGroup;
  fields: IInputFieldPlayer[] = inputsFieldPlayer;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.playerForm = this.fb.group(this.createFormGroup());
  }

  createFormGroup() {
    const group: Record<string, unknown> = {};

    this.fields.forEach((field: IInputFieldPlayer) => {
      group[field.inputFieldName] = [
        field.initialValues,
        field.validators || [],
      ];
    });

    return group;
  }

  onSubmit(): void {
    console.log(this.playerForm.value);
  }
}
