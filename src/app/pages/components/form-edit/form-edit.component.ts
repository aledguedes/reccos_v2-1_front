import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutFormComponent } from '../layout-form/layout-form.component';
import { Router } from '@angular/router';
import { IGeneralFields } from '../../../models/GeneralFieldsInputs';
import { inputsFieldPlayer } from '../../../utils/form-inputs/form-input-player';
import { inputsFieldTeam } from '../../../utils/form-inputs/form-input-team';
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { generalInputsAddress } from '../../../utils/form-inputs/form-input-address';
import { IToForm } from '../../../models/GeneralForms';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [LayoutFormComponent],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss',
})
export class FormEditComponent implements OnInit {
  private flagMappings: Record<string, IGeneralFields[]> = {
    players: inputsFieldPlayer,
    teams: inputsFieldTeam,
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
      const flag = data['f'];
      const strFlag: string = this.switchFlags(flag);
      this.titlePage = `${data['action'] === 'create' ? 'Novo' : 'Editar'} ${strFlag}`;

      this.edit = {
        flag: flag,
        data_id: +data['p'],
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

  statusForm($event: boolean) {
    this.completdForm = $event;
  }

  onCancel() {
    const currentUrl = this.router.url.split('/');
    const baseRoute = currentUrl[1];

    // Navegar para a lista do componente correspondente
    this.router.navigate([`/${baseRoute}`]); // Redireciona para /player ou /team
  }

  getFieldsByFlag(flag: string): { person: IGeneralFields[] } {
    const personFields = this.flagMappings[flag] || this.flagMappings['teams'];
    return { person: personFields };
  }

  switchFlags(flag: string) {
    switch (flag) {
      case 'players':
        return 'atleta';

      case 'teams':
        return 'time';

      default:
        return '';
    }
  }
}
