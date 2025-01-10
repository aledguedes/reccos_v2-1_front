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
  @Input() update = false;
  @Output() statusForm = new EventEmitter<boolean>();

  private subscription: Subscription = new Subscription();

  edit: IToForm = {
    flag: '',
    update: false,
    data_id: 0,
  };

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
        // Organize os dados em steps (categorias)
        this.stepsForm = Object.keys(form).map((key, index) => ({
          label: key,
          enable: true,
          step: index + 1,
          data: form[key as keyof IGroupedFields],
        }));
      },
    );

    const dataSubscription = this.rxjs.dataForm$.subscribe((form: IToForm) => {
      this.edit = form;
      if (form.update) {
        this.loadFlagData(form.flag as keyof FlagMap, form.data_id);
      }
    });
    this.subscription.add(dataSubscription);
    this.subscription.add(fieldsSubscription);

    // Atribuindo os dados para as etapas do formulário
    // this.stepsForm = this.getStepsForForm();
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

  updateStatus(event: { form: keyof IStatusFormValidate; status: boolean }) {
    if (event.form in this.statusValidation) {
      this.statusValidation[event.form] = event.status;

      const allFormsValid = Object.values(this.statusValidation).every(
        (status) => status === true,
      );

      this.allFormsCompleted = allFormsValid;
    }
  }

  // Função para verificar se a etapa está habilitada
  isStepEnabled(step: number): boolean {
    const stepConfig = this.stepsForm.find((s) => s.step === step);
    return stepConfig ? stepConfig.enable : false;
  }

  // Função para avançar para a próxima etapa
  nextStep() {
    if (
      this.currentStep < this.stepsForm.length &&
      this.isStepEnabled(this.currentStep + 1)
    ) {
      this.currentStep++;
    }
  }

  // Função para voltar para a etapa anterior
  prevStep() {
    if (this.currentStep > 1 && this.isStepEnabled(this.currentStep - 1)) {
      this.currentStep--;
    }
  }

  // Função para dividir os dados em etapas
  // getStepsForForm(): IStepsComponent[] {
  //   // const groupedFields = this.rxjs.getGroupedFields(); // Suponha que essa função retorna os dados de groupedFields
  //   return Object.keys(groupedFields).map((key, index) => ({
  //     step: index + 1,
  //     label: `Etapa ${index + 1}`,
  //     fields: groupedFields[key], // Associa os campos a cada etapa
  //     enable: true, // Adicione lógica para habilitar ou desabilitar etapas
  //   }));
  // }
}
