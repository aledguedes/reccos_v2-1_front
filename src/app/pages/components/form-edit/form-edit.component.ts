import { Component, OnInit } from '@angular/core';
import { IToForm } from '../../../models/GeneralForms';
import { ActivatedRoute } from '@angular/router';
import { GenericsService } from '../../../services/generics/generics.service';
import { LayoutFormComponent } from '../layout-form/layout-form.component';

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
      this.genericService.receivedFlags(data['f']);
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
}
