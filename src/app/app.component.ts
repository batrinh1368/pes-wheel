import { TeamService } from './../services/team.service';
import { ITeam, Team } from 'src/app/models';
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Color } from './models/color';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nations: ITeam[];
  clubs: ITeam[];
  nation?: ITeam;
  club?: ITeam;

  constructor(private teamService: TeamService) {
    this.getTeamListOption(this.teamService.defaultNations, this.teamService.defaultClubs);
  }

  onSelected(selectedIndex) {
    this.nation = this.nations[selectedIndex];
    this.club = this.clubs[selectedIndex];
    this.nation.flag = this.teamService.getNationIcon(this.nation.code);
    this.club.flag = this.teamService.getClubIcon(this.club.code);
    console.log('The selected nation is', this.nation);
    console.log('The selected club is', this.club);
  }

  private getTeamListOption(nations: Team[], clubs: Team[]) {
    const totalTeam = Math.min(nations.length, clubs.length);
    const dataNations: Team[] = [];
    const dataClubs: Team[] = [];
    for (let i = 0; i < totalTeam; i++) {
      const color = Color.POPULAR_LIST[i % Color.POPULAR_LIST.length];
      dataNations.push({
        name: nations[i].name,
        color: color,
        code: nations[i].code,
      });
      dataClubs.push({
        name: clubs[i].name,
        color: color,
        code: clubs[i].code,
      });
    }

    this.nations = dataNations;
    this.clubs = dataClubs;
  }

  private isNationType(type: string) {
    return type === 'nation';
  }
}
