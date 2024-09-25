import { Component, OnInit } from '@angular/core';
import { TeamLayoutFormComponent } from '../team-layout-form/team-layout-form.component';
import { ActivatedRoute } from '@angular/router';

interface ITeamForm {
  update: boolean;
  team_id: number;
}

@Component({
  selector: 'app-team-edit',
  standalone: true,
  imports: [TeamLayoutFormComponent],
  templateUrl: './team-edit.component.html',
  styleUrl: './team-edit.component.scss',
})
export class TeamEditComponent implements OnInit {
  titlePage = '';
  teamForm!: ITeamForm;
  constructor(private actvRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      this.titlePage = data['action'] === 'create' ? 'Novo' : 'Editar';
      this.teamForm = {
        update: data['action'] === 'update',
        team_id: data['action'] === 'update' ? +data['p'] : 0,
      };
    });
  }
}
