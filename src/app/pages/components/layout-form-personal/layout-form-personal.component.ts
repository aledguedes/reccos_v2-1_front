import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { Subscription } from 'rxjs';
import { InputFormsComponent } from '../input-forms/input-forms.component';
import { SelectFormsComponent } from '../select-forms/select-forms.component';
import { FlagMap } from '../../../services/interfaces-map/interfaces-map';

@Component({
  selector: 'app-layout-form-personal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputFormsComponent,
    SelectFormsComponent,
  ],
  templateUrl: './layout-form-personal.component.html',
  styleUrl: './layout-form-personal.component.scss',
})
export class LayoutFormPersonalComponent implements OnInit, OnDestroy {
  personalForm!: FormGroup;
  personalData: IGeneralFields[] = [];
  @Input() update = false;
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
  ) {}

  ngOnInit(): void {
    const dataSubscription = this.rxjs.personDataForm$.subscribe(
      (form: IGeneralFields[]) => {
        this.personalData = form;
        this.personalForm = this.fb.group(
          this.createFormGroup(this.personalData),
        );
      },
    );

    const personalSubscription = this.rxjs.updateFormPersonalId$.subscribe(
      (personal: FlagMap[keyof FlagMap] | null) => {
        if (personal && this.update) {
          this.personalForm.reset();
          this.updatedForm(personal);
        }
      },
    );

    this.subscription.add(dataSubscription);
    this.subscription.add(personalSubscription);
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

  updatedForm(personal: FlagMap[keyof FlagMap]) {
    if (personal['birth_date']) {
      const birthDate = new Date(personal['birth_date']);
      personal['birth_date'] = birthDate.toISOString().split('T')[0];
    }
    const { address, ...personalData } = personal;

    this.personalForm.patchValue(personalData);

    if (Object.keys(address).length > 0) {
      this.rxjs.updateAddresslId(address);
    }
  }
}
