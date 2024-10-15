import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutFormComponent } from '../layout-form/layout-form.component';
import { Router } from '@angular/router';
import { IGeneralFields } from '../../../models/generals/GeneralFieldsInputs';
import { inputsFieldPlayer } from '../../../utils/form-inputs/form-input-player';
import { inputsFieldTeam } from '../../../utils/form-inputs/form-input-team';
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { generalInputsAddress } from '../../../utils/form-inputs/form-input-address';
import { IToForm } from '../../../models/generals/GeneralForms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { inputsFieldFederation } from '../../../utils/form-inputs/form-input-federations';
import { inputsFieldRefree } from '../../../utils/form-inputs/form-input-refrees';
import { inputsFieldLeagues } from '../../../utils/form-inputs/form-input-leagues';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [LayoutFormComponent, BreadcrumbComponent],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss',
})
export class FormEditComponent implements OnInit {
  private flagMappings: Record<string, IGeneralFields[]> = {
    teams: inputsFieldTeam,
    players: inputsFieldPlayer,
    refrees: inputsFieldRefree,
    leagues: inputsFieldLeagues,
    federations: inputsFieldFederation,
  };
  titlePage = '';
  formAddress = false;
  completdForm = false;

  edit: IToForm = {
    update: false,
    data_id: 0,
  };

  constructor(
    private router: Router,
    private rxjs: DataRxjsService,
    private actvRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      this.resetForms();
      const flag = data['f'];

      this.titlePage = this.createName(flag, data['action'] === 'update');

      this.edit = {
        flag: flag,
        data_id: data['action'] === 'update' ? +data['p'] : 0,
        update: data['action'] === 'update',
      };

      const fields = this.getFieldsByFlag(flag);
      this.rxjs.sendPersonalForm(fields.person);

      const haveAddress = ['players', 'teams'];
      this.formAddress = haveAddress.includes(flag);
      if (haveAddress.includes(flag)) {
        this.rxjs.sendAddressForm(generalInputsAddress);
      }
      this.rxjs.sendDataForm(this.edit);
    });
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

  getFieldsByFlag(flag: string): { person: IGeneralFields[] } {
    const personFields = this.flagMappings[flag] || this.flagMappings['teams'];
    return { person: personFields };
  }

  resetForms() {
    this.rxjs.sendAddressForm([]);
    this.rxjs.sendPersonalForm([]);
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
