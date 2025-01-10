import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IGeneralFields,
  IGroupedFields,
} from '../models/generals/GeneralFieldsInputs';
import { IToForm } from '../models/generals/GeneralForms';
import { IAddress } from '../models/generals/Address';
import { FlagMap } from './interfaces-map/interfaces-map';
import { IMenuDashboard } from '../models/generals/MenuDashboard';

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

  personDataForm = new BehaviorSubject<IGroupedFields>({
    dates: [],
    settings: [],
    leagueData: [],
    personalInfo: [],
  });
  personDataForm$ = this.personDataForm.asObservable();

  sendPersonalForm(data: IGroupedFields) {
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

  noAddress = new BehaviorSubject<boolean>(false);
  noAddress$ = this.noAddress.asObservable();

  validateWithNoAddress(data: boolean) {
    console.log('ADREES SERVICE validateWithNoAddress', data);
    this.noAddress.next(data);
  }

  valuePersonalForm = new BehaviorSubject<FlagMap[keyof FlagMap] | null>(null);
  valuePersonalForm$ = this.valuePersonalForm.asObservable();

  sendPersonalFormsValue(personal: FlagMap[keyof FlagMap] | null) {
    this.valuePersonalForm.next(personal);
  }

  titleSectionToolbar = new BehaviorSubject<IMenuDashboard>({
    id: 0,
    name: 'dashboard',
    icon: 'https://primefaces.org/cdn/primeng/images/primeng.svg',
    text: 'Dashboard',
    router: '/',
  });
  titleSectionToolbar$ = this.titleSectionToolbar.asObservable();

  sendTitleToolBar(title: IMenuDashboard) {
    this.titleSectionToolbar.next(title);
  }
}
