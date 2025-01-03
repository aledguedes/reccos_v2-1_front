export interface ILeagueResponse {
  id: number;
  name: string;
  dt_start: Date;
  dt_end: Date;
  enrollment_end: Date;
  enrollment_start: Date;
  location: string;
  league_system: string;
  league_mode: string;
  qt_group: number;
  idd_fed: number;
  img_logo: string;
  status: string;
  federations_id: number;
  turn: boolean;
  created_at: Date;
  updated_at: Date;
  num_teams: number;
  scores_id: number;
}
export interface ILeagueRequest {
  name: string;
  dt_start: Date;
  dt_end: Date;
  enrollment_end: Date;
  enrollment_start: Date;
  location: string;
  league_system: string;
  league_mode: string;
  qt_group: number;
  idd_fed: number;
  img_logo: string;
  status: string;
  federations_id: number;
  turn: boolean;
  created_at: Date;
  updated_at: Date;
  num_teams: number;
  scores_id: number;
}
