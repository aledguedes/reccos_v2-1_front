import { Validators } from '@angular/forms';
import { IGeneralFields } from '../../models/generals/GeneralFieldsInputs';

export const inputsFieldLeagues: IGeneralFields[] = [
  {
    typeComponent: 'input',
    label: 'Nome da Liga:',
    inputFieldName: 'name',
    inputType: 'text',
    placeholder: 'Ex: Liga Nacional',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12',
  },
  {
    typeComponent: 'select',
    label: 'Estado:',
    inputFieldName: 'state',
    options: [
      { value: '', label: 'Selecione o estado' },
      { value: 'ac', label: 'Acre' },
      { value: 'al', label: 'Alagoas' },
      { value: 'ap', label: 'Amapá' },
      { value: 'am', label: 'Amazonas' },
      { value: 'ba', label: 'Bahia' },
      { value: 'ce', label: 'Ceará' },
      { value: 'df', label: 'Distrito Federal' },
      { value: 'es', label: 'Espírito Santo' },
      { value: 'go', label: 'Goiás' },
      { value: 'ma', label: 'Maranhão' },
      { value: 'mt', label: 'Mato Grosso' },
      { value: 'ms', label: 'Mato Grosso do Sul' },
      { value: 'mg', label: 'Minas Gerais' },
      { value: 'pa', label: 'Pará' },
      { value: 'pb', label: 'Paraíba' },
      { value: 'pr', label: 'Paraná' },
      { value: 'pe', label: 'Pernambuco' },
      { value: 'pi', label: 'Piauí' },
      { value: 'rj', label: 'Rio de Janeiro' },
      { value: 'rn', label: 'Rio Grande do Norte' },
      { value: 'rs', label: 'Rio Grande do Sul' },
      { value: 'ro', label: 'Rondônia' },
      { value: 'rr', label: 'Roraima' },
      { value: 'sc', label: 'Santa Catarina' },
      { value: 'sp', label: 'São Paulo' },
      { value: 'se', label: 'Sergipe' },
      { value: 'to', label: 'Tocantins' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
  },
  {
    typeComponent: 'input',
    label: 'Localização:',
    inputFieldName: 'location',
    inputType: 'text',
    placeholder: 'Ex: Batatais',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-md-6 col-sm-12',
  },
  {
    typeComponent: 'input',
    label: 'Data de Início:',
    inputFieldName: 'dt_start',
    inputType: 'date',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-md-3 col-sm-12',
  },
  {
    typeComponent: 'input',
    label: 'Data de Término:',
    inputFieldName: 'dt_end',
    inputType: 'date',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-md-3 col-sm-12',
  },
  {
    typeComponent: 'input',
    label: 'Início das incrições:',
    inputFieldName: 'enrollment_end',
    inputType: 'date',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-md-3 col-sm-12',
  },
  {
    typeComponent: 'input',
    label: 'Fim das incrições:',
    inputFieldName: 'enrollment_start',
    inputType: 'date',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-md-3 col-sm-12',
  },
  {
    typeComponent: 'input',
    label: 'Número de Times:',
    inputFieldName: 'num_teams',
    inputType: 'number',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-md-3 col-sm-12',
  },
  {
    typeComponent: 'input',
    label: 'Quantidade de Grupos:',
    inputFieldName: 'qt_group',
    inputType: 'number',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12',
  },
  {
    typeComponent: 'input',
    label: 'Federação:',
    inputFieldName: 'idd_fed',
    inputType: 'text',
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
  },
  {
    typeComponent: 'select',
    label: 'Modalidade:',
    inputFieldName: 'league_mode',
    options: [
      { value: '', label: 'Selecione a modalidade de disputa' },
      { value: 'caninde', label: 'Canindé' },
      { value: 'futsal', label: 'Futsal' },
      { value: 'areai', label: 'Futebol de areia' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
  },
  {
    typeComponent: 'select',
    label: 'Sistema de Disputa:',
    inputFieldName: 'league_system',
    options: [
      { value: '', label: 'Selecione o sistema de disputa' },
      { value: 'mata-mata', label: 'Mata-Mata' },
      { value: 'pontos_corridos', label: 'Pontos Corridos' },
      { value: 'double_elimination', label: 'Eliminação Dupla' },
      { value: 'round_robin', label: 'Round Robin' },
      { value: 'grupo', label: 'Grupos' },
      { value: 'playoffs', label: 'Playoffs' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
  },
  {
    typeComponent: 'select',
    label: 'Status:',
    inputFieldName: 'status',
    options: [
      { value: '', label: 'Selecione o status' },
      { value: 'active', label: 'Ativo' },
      { value: 'inactive', label: 'Inativo' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
  },
  {
    typeComponent: 'select',
    label: 'Turno:',
    inputFieldName: 'turn',
    options: [
      { value: 's', label: 'Sim' },
      { value: 'n', label: 'Não' },
    ],
    validators: [Validators.required],
    initialValues: '',
    colClass: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
  },
];