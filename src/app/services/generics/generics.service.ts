import { Injectable } from '@angular/core';
import { inputsFieldTeam } from '../../utils/form-inputs/form-input-team';
import { IGeneralFields } from '../../models/GeneralFieldsInputs';
import { generalInputsAddress } from '../../utils/form-inputs/form-input-address';
import { inputsFieldPlayer } from '../../utils/form-inputs/form-input-player';
import { DataRxjsService } from '../data-rxjs.service';
import { IToFormRxjs } from '../../models/IRxjsModel';
import { FlagMap } from '../interfaces-map/interfaces-map';

@Injectable({
  providedIn: 'root',
})
export class GenericsService {
  private flagMappings: Record<string, IGeneralFields[]> = {
    players: inputsFieldPlayer,
    teams: inputsFieldTeam,
  };

  constructor(private rxjs: DataRxjsService) {}

  receivedFlags<K extends keyof FlagMap>(
    flag: string,
    update: boolean,
    dataFromApi?: FlagMap[K],
  ) {
    const fields = this.getFieldsByFlag(flag);

    if (update && dataFromApi) {
      this.updateForm(fields.person, generalInputsAddress, dataFromApi);
    } else {
      this.sendInfo(fields.person, generalInputsAddress);
    }
  }

  getFieldsByFlag(flag: string): { person: IGeneralFields[] } {
    const personFields = this.flagMappings[flag] || this.flagMappings['teams'];
    return { person: personFields };
  }

  updateForm<K extends keyof FlagMap>(
    person: IGeneralFields[],
    address: IGeneralFields[],
    data: FlagMap[K],
  ) {
    const updatedPerson = this.updateFormWithApiData(person, data);
    const updatedAddress = this.updateFormWithApiData(address, data?.address);
    this.sendInfo(updatedPerson, updatedAddress);
  }

  updateFormWithApiData(
    formFields: IGeneralFields[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiData: any,
  ): IGeneralFields[] {
    return formFields.map((field) => ({
      ...field,
      initialValues: apiData?.[field.inputFieldName] || field.initialValues,
    }));
  }

  sendInfo(person: IGeneralFields[], address: IGeneralFields[] = []) {
    const toForm: IToFormRxjs = { data: person, address };
    this.rxjs.sendDataForm(toForm);
  }
}
