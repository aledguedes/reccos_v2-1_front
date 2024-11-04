import { Component, OnInit } from '@angular/core';
import { dashAdminMenu } from '../../../../utils/dash-admin-menu';
import { IMenuDashboard } from '../../../../models/generals/MenuDashboard';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.scss',
})
export class DashAdminComponent implements OnInit {
  dashMenu: IMenuDashboard[] = [];
  loader = false;
  ngOnInit(): void {
    this.dashMenu = [];
    setTimeout(() => {
      this.insertValues(dashAdminMenu);
    }, 2000);

    console.log('LOADER', this.loader, this.dashMenu, this.dashMenu.length);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insertValues(data: any) {
    this.dashMenu = data;
    this.loader = this.dashMenu.length > 0;
  }
}
