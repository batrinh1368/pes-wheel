export interface ITeam {
  name: string;
  code?: string;
  flag?: string;
  color?: string;
  rank?: number;
}

export class Team implements ITeam{
  name: string;
  code?: string;
  flag?: string;
  color?: string;
  rank?: number;
}
