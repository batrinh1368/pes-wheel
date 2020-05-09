import { Injectable } from '@angular/core';
import { ITeam } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  nations: ITeam[];
  clubs: ITeam[];

  constructor() {}

  public get defaultNations(): ITeam[] {
    return [
      {
        name: "Pháp",
        flag: "",
        color: "",
      },
      {
        name: "Bỉ",
        flag: "",
        color: "",
      },
      {
        name: "Đức",
        flag: "",
        color: "",
      },
      {
        name: "Anh",
        flag: "",
        color: "",
      },
      {
        name: "Brazil",
        flag: "",
        color: "",
      },
    ];
  }

  public get defaultClubs(): ITeam[] {
    return [
      {
        name: "Manchester United",
        flag: "",
        color: "",
      },
      {
        name: "Liverpool",
        flag: "",
        color: "",
      },
      {
        name: "Barcelona",
        flag: "",
        color: "",
      },
      {
        name: "Real Madrid",
        flag: "",
        color: "",
      },
      {
        name: "Bayern Munich",
        flag: "",
        color: "",
      },
    ];
  }
}
