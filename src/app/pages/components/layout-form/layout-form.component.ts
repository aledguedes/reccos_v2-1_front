import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFormsComponent } from '../input-forms/input-forms.component';
import { SelectFormsComponent } from '../select-forms/select-forms.component';
import { RouterLink } from '@angular/router';
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { Subscription } from 'rxjs';
import { FlagMap } from '../../../services/interfaces-map/interfaces-map';
import { GenericsUpdatedsService } from '../../../services/generics/generics-updateds.service';
import { IToForm } from '../../../models/generals/GeneralForms';
import { LayoutFormAddressComponent } from '../layout-form-address/layout-form-address.component';
import { LayoutFormPersonalComponent } from '../layout-form-personal/layout-form-personal.component';
import { FormUploadComponent } from '../form-upload/form-upload.component';
import {
  statusForms,
  stepForms,
} from '../../../utils/step-layout-forms/step-forms';

interface IStepsComponent {
  label: string;
  enable: boolean;
}

interface IStatusFormValidate {
  [key: string]: boolean;
  upload: boolean;
  address: boolean;
  personal: boolean;
}

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
    FormUploadComponent,
  ],
  templateUrl: './layout-form.component.html',
  styleUrl: './layout-form.component.scss',
})
export class LayoutFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() update = false;
  @Input() address = false;
  @Output() statusForm = new EventEmitter<boolean>();
  private subscription: Subscription = new Subscription();
  edit: IToForm = {
    flag: '',
    update: false,
    data_id: 0,
  };

  step = 1;

  control = false;
  allFormsCompleted = false;

  stepsForm: IStepsComponent[] = stepForms;
  statusValidation: IStatusFormValidate = statusForms;

  constructor(
    private rxjs: DataRxjsService,
    private generalService: GenericsUpdatedsService,
  ) {}

  ngOnInit(): void {
    const dataSubscription = this.rxjs.dataForm$.subscribe((form: IToForm) => {
      this.edit = form;
      if (form.update) {
        this.loadFlagData(form.flag as keyof FlagMap, form.data_id);
      }
    });

    this.subscription.add(dataSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);

    if (!changes['address'].currentValue) {
      this.updateStatus({
        form: 'address',
        status: !changes['address'].currentValue,
      });
    }
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
  nextStep() {
    this.step++;
    if (this.step === 2 && !this.address) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
      if (this.step === 2 && !this.address) {
        this.step--;
      }
    }
  }

  updateStatus(event: { form: keyof IStatusFormValidate; status: boolean }) {
    console.log('CHECANDO OS VALIDATIONS FORM', event);

    if (event.form in this.statusValidation) {
      this.statusValidation[event.form] = event.status;

      const allFormsValid = Object.values(this.statusValidation).every(
        (status) => status === true,
      );

      this.allFormsCompleted = allFormsValid;
    }
  }
}
