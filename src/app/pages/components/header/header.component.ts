import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { DataRxjsService } from '../../../services/data-rxjs.service';
import { Subscription } from 'rxjs';
import { IMenuDashboard } from '../../../models/generals/MenuDashboard';

import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

const modules = [Toolbar, AvatarModule, ButtonModule];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [...modules],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private rxjs = inject(DataRxjsService);
  private subscription: Subscription = new Subscription();
  section: IMenuDashboard = {
    id: 0,
    name: 'dashboard',
    icon: 'https://primefaces.org/cdn/primeng/images/primeng.svg',
    text: 'Dashboard',
    router: '/',
  };

  ngOnInit(): void {
    const title = this.rxjs.titleSectionToolbar$.subscribe(
      (title: IMenuDashboard) => {
        this.section = title;
      },
    );

    this.subscription.add(title);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
