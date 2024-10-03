import { IPlayerResponse } from '../../models/PlayerModel';
import { ITeamResponse } from '../../models/TeamModel';

export interface FlagMap {
  players: IPlayerResponse;
  teams: ITeamResponse;
}
