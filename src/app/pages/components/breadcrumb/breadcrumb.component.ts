import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBreadcrumb } from '../../../models/generals/BreadcrumbModels';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, BreadcrumbModule, NgClass, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input() items: Partial<IBreadcrumb>[] = [];
  home: Partial<IBreadcrumb> = {
    icon: 'pi pi-home',
    route: '/dashboard',
  };
}
