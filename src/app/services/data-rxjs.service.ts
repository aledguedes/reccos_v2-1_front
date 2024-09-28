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
  });
  dataForm$ = this.dataForm.asObservable();

  sendDataForm(data: IToFormRxjs) {
    console.log('sendDataForm', data);
    this.dataForm.next(data);
  }
}
