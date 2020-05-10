import { Color } from './../app/models/color';
import { Injectable } from '@angular/core';
import { ITeam } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  nations: ITeam[];
  clubs: ITeam[];

  constructor() {}

  public getNationIcon(code) {
    return `https://www.countryflags.io/${code}/flat/64.png`;
  }

  public getClubIcon(code) {
    return `https://logo.clearbit.com/${code}`;
  }

  public get defaultNations(): ITeam[] {
    return [
      {
        name: 'Pháp',
        code: 'FR',
        flag: '',
        color: '',
      },
      {
        name: 'Bỉ',
        code: 'BE',
        flag: '',
        color: '',
      },
      {
        name: 'Đức',
        code: 'DE',
        flag: '',
        color: '',
      },
      {
        name: 'Anh',
        code: 'GB',
        flag: '',
        color: '',
      },
      {
        name: 'Brazil',
        code: 'BR',
        flag: '',
        color: '',
      },
    ];
  }

  public get defaultClubs(): ITeam[] {
    return [
      {
        name: 'Manchester United',
        code: 'manutd.com',
        flag: '',
        color: '',
      },
      {
        name: 'Liverpool',
        code: 'liverpoolfc.com',
        flag: '',
        color: '',
      },
      {
        name: 'Barcelona',
        code: 'barcelonastream.com',
        flag: '',
        color: '',
      },
      {
        name: 'Real Madrid',
        code: 'realmadrid.com',
        flag: '',
        color: '',
      },
      {
        name: 'Bayern Munich',
        code: 'bayernmunchenrss.de',
        flag: '',
        color: '',
      },
    ];
  }
}
