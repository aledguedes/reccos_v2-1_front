import { Component, OnInit } from '@angular/core';
import { TeamLayoutFormComponent } from '../team-layout-form/team-layout-form.component';
import { ActivatedRoute } from '@angular/router';
import { IToForm } from '../../../models/GeneralForms';

@Component({
  selector: 'app-team-edit',
  standalone: true,
  imports: [TeamLayoutFormComponent],
  templateUrl: './team-edit.component.html',
  styleUrl: './team-edit.component.scss',
})
export class TeamEditComponent implements OnInit {
  titlePage = '';
  teamForm!: IToForm;
  constructor(private actvRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      this.titlePage = data['action'] === 'create' ? 'Novo' : 'Editar';
      this.teamForm = {
        update: data['action'] === 'update',
        data_id: data['action'] === 'update' ? +data['p'] : 0,
      };
    });
  }
}
