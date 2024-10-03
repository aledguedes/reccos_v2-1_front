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
import { FlagMap } from '../../../services/interfaces-map/interfaces-map';
import { GenericsUpdatedsService } from '../../../services/generics/generics-updateds.service';
import { IToForm } from '../../../models/GeneralForms';

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
  edit: IToForm = {
    flag: '',
    update: false,
    data_id: 0,
  };
  personalData: IGeneralFields[] = [];
  addressData: IGeneralFields[] = [];

  generalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
    private cepService: AddressService,
    private generalService: GenericsUpdatedsService,
  ) {}

  ngOnInit(): void {
    const dataSubscription = this.rxjs.dataForm$.subscribe(
      (form: IToFormRxjs) => {
        this.personalData = form.data;
        this.addressData = form.address;
        this.edit = form.edit;
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
      personal: this.fb.group(this.createFormGroup(this.personalData)),
      address: this.fb.group(this.createFormGroup(this.addressData)),
    });

    if (!this.edit.update) {
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
    } else {
      this.loadFlagData(this.edit.flag as keyof FlagMap, this.edit.data_id);
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

  loadFlagData<K extends keyof FlagMap>(iFlag: K, id: number) {
    // this.initForm();
    this.generalService.getById<K>(iFlag, id).subscribe({
      next: (data: FlagMap[K]) => {
        const { address, ...personal } = data;
        this.updateData({ address, personal });
      },
      error: (err) => {
        console.error('Erro ao carregar dados', err);
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData(data: { address: IAddress; personal: Record<string, any> }) {
    if (data.personal['birth_date']) {
      const birthDate = new Date(data.personal['birth_date']);
      data.personal['birth_date'] = birthDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }
    this.generalForm.patchValue({
      address: data.address,
      personal: data.personal,
    });
  }
}
