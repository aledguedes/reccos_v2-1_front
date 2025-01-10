import { ValidatorFn } from '@angular/forms';
import { IAddress } from './Address';

export interface IGeneralFields {
  typeComponent: 'input' | 'select';
  label: string;
  inputFieldName: string;
  inputType?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'date'
    | 'tel'
    | 'url'
    | 'file';
  placeholder?: string;
  options?: IOptions[];
  validators?: ValidatorFn[];
  initialValues: string | number | boolean | Date | IAddress;
  accept?: string;
  step?: string;
  colClass?: string;
}

export interface IOptions {
  value: string;
  label: string;
}

export interface IGroupedFields {
  field1: IGeneralFields[];
  field2: IGeneralFields[];
  field3: IGeneralFields[];
  field4: IGeneralFields[];
}
