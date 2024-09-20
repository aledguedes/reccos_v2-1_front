import { ValidatorFn } from '@angular/forms';

export interface IGeneralFields {
  typeComponent: 'input' | 'select';
  label: string;
  inputFieldId: string;
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
  initialValues: string;
  accept?: string;
  step?: string;
  colClass?: string;
}

export interface IOptions {
  value: string;
  label: string;
}
