import { Component, inject, OnInit } from '@angular/core';
import { dashAdminMenu } from '../../../../utils/dash-admin-menu';
import { IMenuDashboard } from '../../../../models/generals/MenuDashboard';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataRxjsService } from '../../../../services/data-rxjs.service';

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [RouterLink, ButtonModule, CardModule],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.scss',
})
export class DashAdminComponent implements OnInit {
  private rxjs = inject(DataRxjsService);
  private actRouter = inject(ActivatedRoute);
  dashMenu: IMenuDashboard[] = dashAdminMenu;
  loader = true;

  ngOnInit(): void {
    this.actRouter.queryParams.subscribe((data) => {
      console.log('queryParams', data);
    });
  }

  toolBarTitle(menu: IMenuDashboard) {
    this.rxjs.sendTitleToolBar(menu);
  }
}
