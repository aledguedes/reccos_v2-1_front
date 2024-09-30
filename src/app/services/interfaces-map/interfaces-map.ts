import { IPlayerRequest } from '../../models/PlayerModel';
import { ITeamRequest } from '../../models/TeamModel';

export interface FlagMap {
  players: IPlayerRequest;
  teams: ITeamRequest;
}
