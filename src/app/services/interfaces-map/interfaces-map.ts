import { IPlayerResponse } from '../../models/entities/PlayerModel';
import { ITeamResponse } from '../../models/entities/TeamModel';

export interface FlagMap {
  players: IPlayerResponse;
  teams: ITeamResponse;
}
