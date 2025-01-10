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
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { Subscription } from 'rxjs';
import { FlagMap } from '../../../services/interfaces-map/interfaces-map';
import { GenericsUpdatedsService } from '../../../services/generics/generics-updateds.service';
import { IToForm } from '../../../models/generals/GeneralForms';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LayoutFormDynamicComponent } from '../../../layouts/layout-form-dynamic/layout-form-dynamic.component';
import {
  IGeneralFields,
  IGroupedFields,
} from '../../../models/generals/GeneralFieldsInputs';

interface IStepsComponent {
  step: number;
  label: string;
  enable: boolean;
  data: IGeneralFields[];
}

interface IStatusFormValidate {
  [key: string]: boolean;
  upload: boolean;
  address: boolean;
  personal: boolean;
}

const components = [LayoutFormDynamicComponent];
const primeNg = [StepperModule, ButtonModule, CardModule];

const modules = [ReactiveFormsModule, CommonModule];

@Component({
  selector: 'app-layout-form',
  standalone: true,
  imports: [...components, ...primeNg, ...modules],
  templateUrl: './layout-form.component.html',
  styleUrl: './layout-form.component.scss',
})
export class LayoutFormComponent implements OnInit, OnDestroy {
  @Input() crtlFormUpdate: IToForm = {
    update: false,
    data_id: 0,
  };
  @Output() statusForm = new EventEmitter<boolean>();

  private subscription: Subscription = new Subscription();

  control = false;
  allFormsCompleted = false;

  stepsForm: IStepsComponent[] = [];
  statusValidation!: IStatusFormValidate;
  stepControl = 1;
  currentStep = 1;

  constructor(
    private rxjs: DataRxjsService,
    private generalService: GenericsUpdatedsService,
  ) {}

  ngOnInit(): void {
    const fieldsSubscription = this.rxjs.personDataForm$.subscribe(
      (form: IGroupedFields) => {
        this.stepsForm = Object.keys(form).map((key, index) => ({
          label: key,
          enable: true,
          step: index + 1,
          data: form[key as keyof IGroupedFields],
        }));
      },
    );
    console.log('crtlFormUpdate', this.stepsForm);

    this.subscription.add(fieldsSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadFlagData(iFlag: keyof FlagMap, id: number) {
    this.generalService.getById(iFlag, id).subscribe({
      next: (data: FlagMap[typeof iFlag]) => {
        console.log('loadFlagData SERVIE', data);
        this.rxjs.updatePersonalId(data);
      },
      error: (err) => {
        console.error('Erro ao carregar dados', err);
      },
    });
  }

  updateStatus(event: { form: keyof IStatusFormValidate; status: boolean }) {
    if (event.form in this.statusValidation) {
      this.statusValidation[event.form] = event.status;

      const allFormsValid = Object.values(this.statusValidation).every(
        (status) => status === true,
      );

      this.allFormsCompleted = allFormsValid;
    }
  }

  isStepEnabled(step: number): boolean {
    const stepConfig = this.stepsForm.find((s) => s.step === step);
    return stepConfig ? stepConfig.enable : false;
  }

  nextStep() {
    if (
      this.currentStep < this.stepsForm.length &&
      this.isStepEnabled(this.currentStep + 1)
    ) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1 && this.isStepEnabled(this.currentStep - 1)) {
      this.currentStep--;
    }
  }
}
