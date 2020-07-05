export interface ITeam {
  index?: number;
  name: string;
  code?: string;
  flag?: string;
  color?: string;
  rank?: number;
  favorite?: boolean;
}

export class Team implements ITeam {
  index?: number;
  name: string;
  code?: string;
  flag?: string;
  color?: string;
  rank?: number;
  favorite?: boolean;
}
