import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IBreadcrumb } from '../../../models/generals/BreadcrumbModels';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: IBreadcrumb[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateBreadcrumbs();
  }

  updateBreadcrumbs() {
    const urlSegments = this.router.url.split('/').filter((segment) => segment);
    this.breadcrumbs = [];

    this.breadcrumbs.push({ label: 'Dashboard', router: '/dashboard' });
    urlSegments.forEach((segment, index) => {
      const label = this.capitalize(segment);
      const router = '/' + urlSegments.slice(0, index + 1).join('/');

      this.breadcrumbs.push({ label, router });
    });
  }

  capitalize(segment: string): string {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }
}
