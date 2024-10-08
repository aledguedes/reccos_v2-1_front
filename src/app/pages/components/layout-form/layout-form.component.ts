import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFormsComponent } from '../input-forms/input-forms.component';
import { SelectFormsComponent } from '../select-forms/select-forms.component';
import { RouterLink } from '@angular/router';
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { Subscription } from 'rxjs';
import { FlagMap } from '../../../services/interfaces-map/interfaces-map';
import { GenericsUpdatedsService } from '../../../services/generics/generics-updateds.service';
import { IToForm } from '../../../models/GeneralForms';
import { LayoutFormAddressComponent } from '../layout-form-address/layout-form-address.component';
import { LayoutFormPersonalComponent } from '../layout-form-personal/layout-form-personal.component';

@Component({
  selector: 'app-layout-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputFormsComponent,
    SelectFormsComponent,
    RouterLink,
    LayoutFormAddressComponent,
    LayoutFormPersonalComponent,
  ],
  templateUrl: './layout-form.component.html',
  styleUrl: './layout-form.component.scss',
})
export class LayoutFormComponent implements OnInit, OnDestroy {
  @Input() address = false;
  @Output() statusForm = new EventEmitter<boolean>();
  private subscription: Subscription = new Subscription();
  edit: IToForm = {
    flag: '',
    update: false,
    data_id: 0,
  };

  constructor(
    private rxjs: DataRxjsService,
    private generalService: GenericsUpdatedsService,
  ) {}

  ngOnInit(): void {
    const dataSubscription = this.rxjs.dataForm$.subscribe((form: IToForm) => {
      this.edit = form;
      console.log('DATA FORM RXJS', form);
      if (form.update) {
        this.loadFlagData(form.flag as keyof FlagMap, form.data_id);
      }
    });

    this.subscription.add(dataSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadFlagData(iFlag: keyof FlagMap, id: number) {
    this.generalService.getById(iFlag, id).subscribe({
      next: (data: FlagMap[typeof iFlag]) => {
        this.rxjs.updatePersonalId(data);
      },
      error: (err) => {
        console.error('Erro ao carregar dados', err);
      },
    });
  }
}
