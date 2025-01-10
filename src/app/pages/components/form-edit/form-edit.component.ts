import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutFormComponent } from '../layout-form/layout-form.component';
import { Router } from '@angular/router';
import { inputsFieldPlayer } from '../../../utils/form-inputs/form-input-player';
import { inputsFieldTeam } from '../../../utils/form-inputs/form-input-team';
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { IToForm } from '../../../models/generals/GeneralForms';
import { inputsFieldFederation } from '../../../utils/form-inputs/form-input-federations';
import { inputsFieldRefree } from '../../../utils/form-inputs/form-input-refrees';
import { inputsFieldLeagues } from '../../../utils/form-inputs/form-input-leagues';
import { FormsModule } from '@angular/forms';
import { IGroupedFields } from '../../../models/generals/GeneralFieldsInputs';
import { FlagMap } from '../../../services/interfaces-map/interfaces-map';
import { GenericsUpdatedsService } from '../../../services/generics/generics-updateds.service';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [LayoutFormComponent, FormsModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss',
})
export class FormEditComponent implements OnInit {
  private flagMappings: Record<string, IGroupedFields> = {
    teams: inputsFieldTeam,
    players: inputsFieldPlayer,
    refrees: inputsFieldRefree,
    leagues: inputsFieldLeagues,
    federations: inputsFieldFederation,
  };
  titlePage = '';
  completdForm = false;

  edit: IToForm = {
    update: false,
    data_id: 0,
  };

  constructor(
    private router: Router,
    private rxjs: DataRxjsService,
    private actvRouter: ActivatedRoute,
    private generalService: GenericsUpdatedsService,
  ) {}

  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      this.resetForms();
      const id = +data['p'];
      const flag = data['f'];

      this.titlePage = this.createName(flag, data['action'] === 'update');

      this.edit = {
        flag: flag,
        update: data['action'] === 'update',
        data_id: data['action'] === 'update' ? +data['p'] : 0,
      };

      const fields = this.getFieldsByFlag(flag);
      this.rxjs.sendPersonalForm(fields);

      if (data['action'] === 'update') {
        this.loadFlagData(flag as keyof FlagMap, id, fields);
      }
    });
  }

  loadFlagData(iFlag: keyof FlagMap, id: number, fields: IGroupedFields) {
    this.generalService.getById(iFlag, id).subscribe({
      next: (data: FlagMap[typeof iFlag]) => {
        console.log('loadFlagData SERVIE', data);
        this.updateFormValues(fields, data);
      },
      error: (err) => {
        console.error('Erro ao carregar dados', err);
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFormValues(fields: IGroupedFields, data: Record<string, any>): void {
    Object.keys(fields).forEach((fieldKey) => {
      const key = fieldKey as keyof IGroupedFields;

      fields[key].forEach((inputField) => {
        const fieldName = inputField.inputFieldName;

        if (data[fieldName] !== undefined) {
          inputField.initialValues = data[fieldName];
        }
      });
    });

    this.rxjs.sendPersonalForm(fields);
  }

  createName(flag: string, update: boolean) {
    const listFlags = ['federations', 'leagues'];
    const strFlag: string = this.switchFlags(flag);

    return update
      ? `Editar ${strFlag}`
      : `${listFlags.includes(flag) ? 'Nova' : 'Novo'} ${strFlag}`;
  }

  statusForm($event: boolean) {
    this.completdForm = $event;
  }

  onCancel() {
    const currentUrl = this.router.url.split('/');
    const baseRoute = currentUrl[1];
    this.router.navigate([`/${baseRoute}`]);
  }

  getFieldsByFlag(flag: string) {
    return this.flagMappings[flag] || this.flagMappings['teams'];
  }

  resetForms() {
    this.rxjs.sendAddressForm([]);
    // this.rxjs.sendPersonalForm([]);
    this.edit = { flag: '', update: false, data_id: 0 };
  }

  switchFlags(flag: string) {
    switch (flag) {
      case 'teams':
        return 'time';

      case 'federations':
        return 'federação';

      case 'leagues':
        return 'liga';

      default:
        return 'atleta';
    }
  }
}
