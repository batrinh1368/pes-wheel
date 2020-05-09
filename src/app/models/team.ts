export interface ITeam {
  name: string;
  flag?: string;
  color?: string;
  rank?: number;
}

export class Team implements ITeam{
  name: string;
  flag?: string;
  color?: string;
  rank?: number;
}
