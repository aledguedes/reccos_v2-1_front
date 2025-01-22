import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardsTableComponent } from './list-cards-table.component';

describe('ListCardsTableComponent', () => {
  let component: ListCardsTableComponent;
  let fixture: ComponentFixture<ListCardsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCardsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCardsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
