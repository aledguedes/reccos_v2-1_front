import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ITeam {
  id?: number;
  surname: string;
}

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss',
})
export class TeamListComponent {
  teams: ITeam[] = [];
  baseUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWhr7q7fMAKPUNqQc7kJQRbI7-VQOizKFTUA&s';
}
