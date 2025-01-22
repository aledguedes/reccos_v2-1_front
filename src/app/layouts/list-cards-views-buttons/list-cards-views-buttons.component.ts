import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { changeViewCards, IButtonView } from '../../utils/buttons-view';

@Component({
  selector: 'app-list-cards-views-buttons',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './list-cards-views-buttons.component.html',
  styleUrl: './list-cards-views-buttons.component.scss',
})
export class ListCardsViewsButtonsComponent {
  @Output() viewChange = new EventEmitter<'landscape' | 'portrait' | 'table'>();
  buttonsViews: IButtonView[] = changeViewCards;

  visualization(view: 'landscape' | 'portrait' | 'table') {
    this.viewChange.emit(view);
  }
}
