import { IGeneralFields } from './generals/GeneralFieldsInputs';
import { IToForm } from './generals/GeneralForms';

export interface IToFormRxjs {
  data: IGeneralFields[];
  address: IGeneralFields[];
  edit: IToForm;
}
