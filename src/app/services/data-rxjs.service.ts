import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToFormRxjs } from '../models/IRxjsModel';

@Injectable({
  providedIn: 'root',
})
export class DataRxjsService {
  dataForm = new BehaviorSubject<IToFormRxjs>({
    address: [],
    data: [],
    edit: {
      flag: 'players',
      update: false,
      data_id: 0,
    },
  });
  dataForm$ = this.dataForm.asObservable();

  sendDataForm(data: IToFormRxjs) {
    this.dataForm.next(data);
  }
}
