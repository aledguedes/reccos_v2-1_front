import { Component, OnInit } from '@angular/core';
import { IToForm } from '../../../models/GeneralForms';
import { ActivatedRoute } from '@angular/router';
import { GenericsService } from '../../../services/generics/generics.service';
import { LayoutFormComponent } from '../layout-form/layout-form.component';
import { GenericsUpdatedsService } from '../../../services/generics/generics-updateds.service';
import { FlagMap } from '../../../services/interfaces-map/interfaces-map';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [LayoutFormComponent],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss',
})
export class FormEditComponent implements OnInit {
  titlePage = '';
  teamForm!: IToForm;

  constructor(
    private actvRouter: ActivatedRoute,
    private genericService: GenericsService,
    private generalService: GenericsUpdatedsService,
  ) {}

  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      const strFlag: string = this.switchFlags(data['f']);
      this.titlePage = `${data['action'] === 'create' ? 'Novo' : 'Editar'} ${strFlag}`;
      this.teamForm = {
        update: data['action'] === 'update',
        data_id: data['action'] === 'update' ? +data['p'] : 0,
        flag: data['f'],
      };
      if (data['action'] === 'create') {
        this.genericService.receivedFlags(
          data['f'],
          data['action'] === 'update',
        );
      } else {
        this.loadFlagData(
          data['f'],
          +data['p'],
          data['f'],
          data['action'] === 'update',
        );
      }
    });
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

  loadFlagData<K extends keyof FlagMap>(
    iFlag: K,
    id: number,
    flag: string,
    update: boolean,
  ) {
    this.generalService.getById<K>(iFlag, id).subscribe({
      next: (data: FlagMap[K]) => {
        console.log('RETURN GENERAL FLAG ID DATA', data);
        this.genericService.receivedFlags(flag, update, data);
      },
      error: (err) => {
        console.log('RETURN GENERAL FLAG ID ERRO', err);
      },
    });
  }
}
