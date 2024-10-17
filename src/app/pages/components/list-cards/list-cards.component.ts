import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IListCads } from '../../../models/generals/ListCardModel';

@Component({
  selector: 'app-list-cards',
  standalone: true,
  imports: [ListCardsComponent, RouterLink],
  templateUrl: './list-cards.component.html',
  styleUrl: './list-cards.component.scss',
})
export class ListCardsComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any;
  @Input() toQueries: IListCads = {
    flag: '',
    router: '',
  };
}
