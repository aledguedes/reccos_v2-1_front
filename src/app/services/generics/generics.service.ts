import { Injectable } from '@angular/core';
import { inputsFieldTeam } from '../../utils/form-inputs/form-input-team';
import { IGeneralFields } from '../../models/GeneralFieldsInputs';
import { generalInputsAddress } from '../../utils/form-inputs/form-input-address';
import { inputsFieldPlayer } from '../../utils/form-inputs/form-input-player';
import { IToFormRxjs } from '../../models/IRxjsModel';
import { DataRxjsService } from '../data-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class GenericsService {
  constructor(private rxjs: DataRxjsService) {}

  receivedFlags(flag: string) {
    // const addressArr: string[] = ['teams', 'players'];
    // const person: IGeneralFields[] = inputsFieldTeam;

    // if (addressArr.includes(flag)) {
    // const address: IGeneralFields[] = generalInputsAddress;
    // }
    console.log('receivedFlags', flag);

    switch (flag) {
      case 'teams':
        this.flagTeams();
        break;
      case 'players':
        this.flagPlayers();
        break;
      default:
        this.flagTeams();
        break;
    }
  }

  flagPlayers() {
    const person: IGeneralFields[] = inputsFieldPlayer;
    const address: IGeneralFields[] = generalInputsAddress;
    console.log('flagPlayers', person, address);
    this.sendInfo(person, address);
  }

  flagTeams() {
    const person: IGeneralFields[] = inputsFieldTeam;
    const address: IGeneralFields[] = generalInputsAddress;
    console.log('flagTeams', person, address);
    this.sendInfo(person, address);
  }

  sendInfo(person: IGeneralFields[], address: IGeneralFields[] = []) {
    const toForm: IToFormRxjs = {
      data: person,
      address: address,
    };
    console.log('sendInfo', toForm);
    this.rxjs.sendDataForm(toForm);
  }
}
