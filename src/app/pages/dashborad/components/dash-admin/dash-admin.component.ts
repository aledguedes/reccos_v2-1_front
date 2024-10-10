import { Component } from '@angular/core';
import { dashAdminMenu } from '../../../../utils/dash-admin-menu';
import { IMenuDashboard } from '../../../../models/generals/MenuDashboard';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.scss',
})
export class DashAdminComponent {
  dashMenu: IMenuDashboard[] = dashAdminMenu;
}
