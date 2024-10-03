import { IGeneralFields } from './GeneralFieldsInputs';
import { IToForm } from './GeneralForms';

export interface IToFormRxjs {
  data: IGeneralFields[];
  address: IGeneralFields[];
  edit: IToForm;
}
