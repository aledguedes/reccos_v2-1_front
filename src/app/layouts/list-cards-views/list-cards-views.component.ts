import { Component, Input } from '@angular/core';
import { ListCardsTableComponent } from '../list-cards-table/list-cards-table.component';
import { ListCardsPortraitComponent } from '../list-cards-portrait/list-cards-portrait.component';
import { ListCardsLandscapeComponent } from '../list-cards-landscape/list-cards-landscape.component';
import { IListCads } from '../../models/generals/ListCardModel';

const components = [
  ListCardsPortraitComponent,
  ListCardsLandscapeComponent,
  ListCardsTableComponent,
];

@Component({
  selector: 'app-list-cards-views',
  standalone: true,
  imports: [...components],
  templateUrl: './list-cards-views.component.html',
  styleUrl: './list-cards-views.component.scss',
})
export class ListCardsViewsComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() interable: any;
  @Input() view: 'landscape' | 'portrait' | 'table' = 'landscape';
  @Input() flagsControl: IListCads = {
    flag: '',
    router: '',
  };
}
