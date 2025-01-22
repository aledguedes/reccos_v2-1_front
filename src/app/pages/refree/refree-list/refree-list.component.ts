import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IListCads } from '../../../models/generals/ListCardModel';
import { RefreeService } from '../../../services/refrees/refree.service';
import { IRefreeRequest } from '../../../models/entities/RefreeModel';
import { IBreadcrumb } from '../../../models/generals/BreadcrumbModels';
import { ButtonModule } from 'primeng/button';
import { ListCardsPortraitComponent } from '../../../layouts/list-cards-portrait/list-cards-portrait.component';

@Component({
  selector: 'app-refree-list',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    RouterLink,
    ListCardsPortraitComponent,
    ButtonModule,
  ],
  templateUrl: './refree-list.component.html',
  styleUrl: './refree-list.component.scss',
})
export class RefreeListComponent implements OnInit {
  page = 1;
  perPage = 12;
  cardFlags: IListCads = {
    flag: 'refrees',
    router: 'refree-edit',
  };
  refrees: IRefreeRequest[] = [];

  breadcrumb: Partial<IBreadcrumb>[] = [
    { icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Árbitros' },
  ];

  constructor(private refreeService: RefreeService) {}

  ngOnInit(): void {
    this.getAllRefrees();
  }

  getAllRefrees() {
    this.refreeService.getAllRefrees(this.page, this.perPage).subscribe({
      next: (data: IRefreeRequest[]) => {
        this.refrees = data;
        console.log('LEAGUES ALL', this.refrees);
      },
      error: (err) => {
        console.log('LEAGUES ALL ERR', err);
      },
    });
  }

  removeLeague(refree_id: number) {
    console.log('refree remove', refree_id);
  }
}
