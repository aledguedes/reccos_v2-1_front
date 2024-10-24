import { Validators } from '@angular/forms';
import { IGeneralFields } from '../../models/generals/GeneralFieldsInputs';

export const inputsFieldPlayer: IGeneralFields[] = [
  {
    typeComponent: 'input',
    label: 'Nome Completo:',
    inputFieldName: 'name',
    inputType: 'text',
    placeholder: 'Ex: João da Silva',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'input',
    label: 'Apelido:',
    inputFieldName: 'surname',
    inputType: 'text',
    placeholder: 'Ex: Joãozinho',
    validators: [],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'input',
    label: 'E-mail:',
    inputFieldName: 'email',
    inputType: 'email',
    placeholder: 'Ex: user@reccos.com',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'input',
    label: 'CPF:',
    inputFieldName: 'cpf',
    inputType: 'text',
    placeholder: '000.000.000-00',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'input',
    label: 'RG:',
    inputFieldName: 'rg',
    inputType: 'text',
    placeholder: '00.000.000-0',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'input',
    label: 'Telefone:',
    inputFieldName: 'phone',
    inputType: 'tel',
    placeholder: 'Ex: (11) 99999-9999',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'input',
    label: 'Data de Nascimento:',
    inputFieldName: 'birth_date',
    inputType: 'date',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'select',
    label: 'Posição:',
    inputFieldName: 'position',
    options: [
      { value: '', label: 'Selecione a posição' },
      { value: 'Atacante', label: 'Atacante' },
      { value: 'Goleiro', label: 'Goleiro' },
      { value: 'Lateral', label: 'Lateral' },
      { value: 'Zagueiro', label: 'Zagueiro' },
      { value: 'Meia', label: 'Meia' },
      { value: 'Volante', label: 'Volante' },
      { value: 'Ala', label: 'Ala' },
      { value: 'Pivô', label: 'Pivô' },
      { value: 'Fixo', label: 'Fixo' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'select',
    label: 'Sexo:',
    inputFieldName: 'gender',
    options: [
      { value: '', label: 'Selecione o sexo' },
      { value: 'masculino', label: 'Masculino' },
      { value: 'feminino', label: 'Feminino' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'select',
    label: 'Status:',
    inputFieldName: 'status',
    options: [
      { value: '', label: 'Selecione o status do atleta' },
      { value: 'active', label: 'Ativo' },
      { value: 'inactive', label: 'Inativo' },
      { value: 'suspend', label: 'Suspenso' },
      { value: 'blocked', label: 'Bloqueado' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  // {
  //   typeComponent: 'input',
  //   label: 'Foto do Atleta (Opcional)',
  //   inputFieldName: 'photo',
  //   inputType: 'file',
  //   placeholder: 'Selecione uma foto',
  //   validators: [],
  //   initialValues: '',
  //   colClass: 'col-12',
  //   accept: 'image/*',
  // },
];
