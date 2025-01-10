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
      this.rxjs.sendPersonalForm(fields);
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
