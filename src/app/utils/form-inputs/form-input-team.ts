import { Validators } from '@angular/forms';
import { IGroupedFields } from '../../models/generals/GeneralFieldsInputs';

export const inputsFieldTeam: IGroupedFields = {
  field1: [
    {
      typeComponent: 'input',
      label: 'Nome Oficial do Time:',
      inputFieldName: 'name',
      inputType: 'text',
      placeholder: 'Minha Agremiação Futebol CLube',
      validators: [Validators.required],
      initialValues: '',
      colClass: 'col-12',
    },
    {
      typeComponent: 'input',
      label: 'Nome Comum:',
      inputFieldName: 'surname',
      inputType: 'text',
      placeholder: 'Minha agremiação',
      validators: [Validators.required],
      initialValues: '',
      colClass: 'col-12',
    },
    {
      typeComponent: 'input',
      label: 'Data de Fundação:',
      inputFieldName: 'birth_date',
      inputType: 'date',
      placeholder: '31/12/2015',
      validators: [Validators.required],
      initialValues: '',
      colClass: 'col-12',
    },
  ],
  field2: [],
  field3: [],
  field4: [],
};
