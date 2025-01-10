import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataRxjsService } from '../../services/data-rxjs.service';
import { Subscription } from 'rxjs';
import { IGeneralFields } from '../../models/generals/GeneralFieldsInputs';
import { InputFormsComponent } from '../../pages/components/input-forms/input-forms.component';
import { SelectFormsComponent } from '../../pages/components/select-forms/select-forms.component';

const modules = [ReactiveFormsModule, CommonModule];
const components = [InputFormsComponent, SelectFormsComponent];

@Component({
  selector: 'app-layout-form-dynamic',
  standalone: true,
  imports: [...modules, ...components],
  templateUrl: './layout-form-dynamic.component.html',
  styleUrl: './layout-form-dynamic.component.scss',
})
export class LayoutFormDynamicComponent implements OnInit, OnDestroy {
  personalForm!: FormGroup;
  @Input() update = false;
  @Input() personalData: IGeneralFields[] = []; // Recebe os dados dinâmicos
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
  ) {}

  ngOnInit(): void {
    this.personalForm = this.fb.group(this.createFormGroup(this.personalData));
  }

  ngOnDestroy(): void {
    this.personalForm.reset();
    this.subscription.unsubscribe();
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
}
