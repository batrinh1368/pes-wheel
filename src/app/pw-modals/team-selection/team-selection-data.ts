import { ITeam } from 'src/app/models';

export interface TeamSelectionData {
  nations: ITeam[];
  clubs: ITeam[];
}

export interface SelectionIndex {
  nationIndex: number;
  clubIndex: number;
}
