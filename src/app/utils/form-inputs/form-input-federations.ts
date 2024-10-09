import { Validators } from '@angular/forms';
import { IGeneralFields } from '../../models/GeneralFieldsInputs';

export const inputsFieldFederation: IGeneralFields[] = [
  {
    typeComponent: 'input',
    label: 'Nome da Federação:',
    inputFieldName: 'name',
    inputType: 'text',
    placeholder: 'Federação de Futebol',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'input',
    label: 'Apelido:',
    inputFieldName: 'surname',
    inputType: 'text',
    placeholder: 'Federação X',
    validators: [],
    initialValues: '',
    colClass: 'col-12 col-md-6 col-sm-12',
  },
  {
    typeComponent: 'select',
    label: 'Status:',
    inputFieldName: 'status',
    options: [
      { value: '', label: 'Selecione o status da federação' },
      { value: 'active', label: 'Ativo' },
      { value: 'inactive', label: 'Inativo' },
      { value: 'suspend', label: 'Suspenso' },
      { value: 'blocked', label: 'Bloqueado' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-md-6 col-sm-12',
  },
];