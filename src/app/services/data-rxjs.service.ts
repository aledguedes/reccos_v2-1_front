import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGeneralFields } from '../models/generals/GeneralFieldsInputs';
import { IToForm } from '../models/generals/GeneralForms';
import { IAddress } from '../models/generals/Address';
import { FlagMap } from './interfaces-map/interfaces-map';

@Injectable({
  providedIn: 'root',
})
export class DataRxjsService {
  dataForm = new BehaviorSubject<IToForm>({
    flag: 'players',
    update: false,
    data_id: 0,
  });
  dataForm$ = this.dataForm.asObservable();

  sendDataForm(data: IToForm) {
    this.dataForm.next(data);
  }

  personDataForm = new BehaviorSubject<IGeneralFields[]>([]);
  personDataForm$ = this.personDataForm.asObservable();

  sendPersonalForm(data: IGeneralFields[]) {
    this.personDataForm.next(data);
  }

  addressDataForm = new BehaviorSubject<IGeneralFields[]>([]);
  addressDataForm$ = this.addressDataForm.asObservable();

  sendAddressForm(data: IGeneralFields[]) {
    this.addressDataForm.next(data);
  }

  updateFormPersonalId = new BehaviorSubject<FlagMap[keyof FlagMap] | null>(
    null,
  );
  updateFormPersonalId$ = this.updateFormPersonalId.asObservable();

  updatePersonalId(data: FlagMap[keyof FlagMap]) {
    this.updateFormPersonalId.next(data);
  }

  updateFormAddresslId = new BehaviorSubject<IAddress>({
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
  });
  updateFormAddresslId$ = this.updateFormAddresslId.asObservable();

  updateAddresslId(data: IAddress) {
    this.updateFormAddresslId.next(data);
  }
}
