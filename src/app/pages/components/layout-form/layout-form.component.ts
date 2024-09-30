import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFormsComponent } from '../input-forms/input-forms.component';
import { SelectFormsComponent } from '../select-forms/select-forms.component';
import { RouterLink } from '@angular/router';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
// import { IToForm } from '../../../models/GeneralForms';
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { IToFormRxjs } from '../../../models/IRxjsModel';
import { debounceTime, Subscription, switchMap } from 'rxjs';
import { AddressService } from '../../../services/address/address.service';
import { IAddress } from '../../../models/Address';

@Component({
  selector: 'app-layout-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputFormsComponent,
    SelectFormsComponent,
    RouterLink,
  ],
  templateUrl: './layout-form.component.html',
  styleUrl: './layout-form.component.scss',
})
export class LayoutFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  // @Input() toForm: IToForm = {
  //   update: false,
  //   data_id: 0,
  // };
  // team!: IDataPlayer;
  personalData: IGeneralFields[] = [];
  addressData: IGeneralFields[] = [];

  generalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
    private cepService: AddressService,
  ) {}

  ngOnInit(): void {
    const dataSubscription = this.rxjs.dataForm$.subscribe(
      (form: IToFormRxjs) => {
        this.personalData = form.data;
        this.addressData = form.address;

        this.initForm();
      },
    );

    this.subscription.add(dataSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm() {
    this.generalForm = this.fb.group({
      team: this.fb.group(this.createFormGroup(this.personalData)),
      address: this.fb.group(this.createFormGroup(this.addressData)),
    });
    // if (update) {
    //   setTimeout(() => {
    //     this.teamById(team_id);
    //   }, 100);
    // }

    // if (!this.toForm.update) {
    this.generalForm
      .get('address.cep')
      ?.valueChanges.pipe(
        debounceTime(1000),
        switchMap((cep) => this.cepService.getAddress(cep)),
      )
      .subscribe((address: IAddress) => {
        this.generalForm.patchValue({
          address: {
            street: address.street,
            city: address.city,
            state: address.state,
            neighborhood: address.neighborhood,
          },
        });
      });
    // }
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
