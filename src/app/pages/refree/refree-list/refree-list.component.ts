import { Component, OnInit } from '@angular/core';
import { ListCardsComponent } from '../../components/list-cards/list-cards.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IListCads } from '../../../models/ListCardModel';
import { RefreeService } from '../../../services/refrees/refree.service';
import { IRefreeRequest } from '../../../models/RefreeModel';

@Component({
  selector: 'app-refree-list',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink, ListCardsComponent],
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
