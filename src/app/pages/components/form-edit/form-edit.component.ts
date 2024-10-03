import { Component, OnInit } from '@angular/core';
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

  constructor(
    private actvRouter: ActivatedRoute,
    private genericService: GenericsService,
  ) {}

  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      const strFlag: string = this.switchFlags(data['f']);
      this.titlePage = `${data['action'] === 'create' ? 'Novo' : 'Editar'} ${strFlag}`;
      const flag_id = data['action'] === 'update' ? +data['p'] : 0;
      this.genericService.receivedFlags(
        data['f'],
        data['action'] === 'update',
        flag_id,
      );
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
