import { Color } from './../app/models/color';
import { Injectable } from '@angular/core';
import { ITeam } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  nations: ITeam[];
  clubs: ITeam[];
  DEFAULT_FLAG = '/assets/favorite.png';
  constructor() {}

  public getNationIcon(code): string {
    if (code) {
      return `https://www.countryflags.io/${code}/flat/64.png`;
    }

    return this.DEFAULT_FLAG;
  }

  public getClubIcon(code): string {
    if (code) {
      return `https://logo.clearbit.com/${code}`;
    }
    return this.DEFAULT_FLAG;
  }

  public get defaultNations(): ITeam[] {
    return [
      {
        name: 'Pháp',
        code: 'FR',
        flag: '',
        color: 'red',
      },
      {
        name: 'Bỉ',
        code: 'BE',
        flag: '',
        color: 'rebeccapurple',
      },
      {
        name: 'Đức',
        code: 'DE',
        flag: '',
        color: 'green',
      },
      {
        name: 'Anh',
        code: 'GB',
        flag: '',
        color: 'pink',
      },
      {
        name: 'Brazil',
        code: 'BR',
        flag: '',
        color: 'blue',
      },
    ];
  }

  public get defaultClubs(): ITeam[] {
    return [
      {
        name: 'Manchester United',
        code: 'manutd.com',
        flag: '',
        color: 'red',
      },
      {
        name: 'Liverpool',
        code: 'liverpoolfc.com',
        flag: '',
        color: 'rebeccapurple',
      },
      {
        name: 'Barcelona',
        code: 'barcelonastream.com',
        flag: '',
        color: 'green',
      },
      {
        name: 'Real Madrid',
        code: 'realmadrid.com',
        flag: '',
        color: 'pink',
      },
      {
        name: 'Bayern Munich',
        code: 'bayernmunchenrss.de',
        flag: '',
        color: 'blue',
      },
    ];
  }
}
