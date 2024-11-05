import { Component } from '@angular/core';
import { dashAdminMenu } from '../../../../utils/dash-admin-menu';
import { IMenuDashboard } from '../../../../models/generals/MenuDashboard';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [RouterLink, ButtonModule, CardModule],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.scss',
})
export class DashAdminComponent {
  dashMenu: IMenuDashboard[] = dashAdminMenu;
  loader = true;
}
