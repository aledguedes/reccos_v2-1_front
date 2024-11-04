import { ValidatorFn } from '@angular/forms';

export interface IInputFieldPlayer {
  typeComponent: 'input' | 'select';
  label: string;
  inputFieldId: string;
  inputFieldName: string;
  inputType?: 'text' | 'number' | 'email' | 'password' | 'date' | 'tel' | 'url';
  placeholder?: string;
  validators?: ValidatorFn[];
  options?: { value: string; label: string }[];
  accept?: string;
  initialValues: string;
}
