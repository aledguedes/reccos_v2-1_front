import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFormsComponent } from '../input-forms/input-forms.component';
import { IGeneralFields } from '../../../models/generals/GeneralFieldsInputs';
import { DataRxjsService } from '../../../services/data-rxjs.service';
import { debounceTime, Subscription, switchMap } from 'rxjs';
import { IAddress } from '../../../models/generals/Address';
import { AddressService } from '../../../services/address/address.service';
import { IStatusForm } from '../../../models/generals/Outputs';

@Component({
  selector: 'app-layout-form-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputFormsComponent],
  templateUrl: './layout-form-address.component.html',
  styleUrl: './layout-form-address.component.scss',
})
export class LayoutFormAddressComponent implements OnInit, OnDestroy {
  addressForm!: FormGroup;
  addressData: IGeneralFields[] = [];
  @Input() update = false;
  @Output() statusFormAddress = new EventEmitter<IStatusForm>();
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
    private cepService: AddressService,
  ) {}

  ngOnInit(): void {
    const dataSubscription = this.rxjs.addressDataForm$.subscribe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (form: any) => {
        this.addressData = form;
        this.addressForm = this.fb.group(
          this.createFormGroup(this.addressData),
        );

        this.addressForm.statusChanges.subscribe((newStaus) => {
          this.statusFormAddress.emit({
            form: 'address',
            status: newStaus === 'VALID',
          });
        });
      },
    );
    this.addressForm
      .get('address.cep')
      ?.valueChanges.pipe(
        debounceTime(1000),
        switchMap((cep) => this.cepService.getAddress(cep)),
      )
      .subscribe((address: IAddress) => {
        this.addressForm.patchValue({
          address: {
            street: address.street,
            city: address.city,
            state: address.state,
            neighborhood: address.neighborhood,
          },
        });
      });

    const addressSubscription = this.rxjs.updateFormAddresslId$.subscribe(
      (address: IAddress) => {
        if (this.update) {
          this.addressForm.reset();
          this.addressForm.patchValue(address);
          this.statusFormAddress.emit({
            form: 'address',
            status: this.addressForm.status === 'VALID',
          });
        }
      },
    );

    const noAddress = this.rxjs.noAddress$.subscribe((address: boolean) => {
      this.statusFormAddress.emit({
        form: 'address',
        status: address,
      });
    });

    this.subscription.add(noAddress);
    this.subscription.add(dataSubscription);
    this.subscription.add(addressSubscription);
  }

  ngOnDestroy(): void {
    this.addressForm.reset();
    this.subscription.unsubscribe();
  }

  createFormGroup(data: IGeneralFields[]): Record<string, unknown> {
    const group: Record<string, unknown> = {};

    data.forEach((fieldset: IGeneralFields) => {
      group[fieldset.inputFieldName] = [
        fieldset.initialValues,
        fieldset.validators || [],
      ];
    });

    return group;
  }
}
