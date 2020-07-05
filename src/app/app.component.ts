import { WheelComponent } from './../components/wheel/wheel.component';
import { TeamService } from './../services/team.service';
import { ITeam, Team } from 'src/app/models';
import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Color } from './models/color';
import { MatDialog } from '@angular/material/dialog';
import { TeamSelectionComponent } from './pw-modals/team-selection/team-selection.component';
import {
  SelectionIndex,
  TeamSelectionData,
} from './pw-modals/team-selection/team-selection-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('wheel', { static: false }) wheel: WheelComponent;

  // list with favorite
  nations: ITeam[];
  clubs: ITeam[];
  // origin list
  originNations: ITeam[];
  originClubs: ITeam[];
  nation?: ITeam;
  club?: ITeam;
  hasFavorite = false;
  isFavorite = false;
  showResult = false;

  favoriteTeam: ITeam = {
    index: 0,
    name: 'Favorite team',
    color: Color.FAVORITE_COLOR,
    favorite: true,
  };

  constructor(public dialog: MatDialog, private teamService: TeamService) {
    this.getTeamListOption(
      this.teamService.defaultNations,
      this.teamService.defaultClubs
    );
  }

  onSelected(selectionData: SelectionIndex) {
    console.log('onSelected', selectionData);
    this.nation = this.nations[selectionData.nationIndex];
    this.club = this.clubs[selectionData.clubIndex];
    this.nation.flag = this.teamService.getNationIcon(this.nation.code);
    this.club.flag = this.teamService.getClubIcon(this.club.code);
    this.isFavorite = !!this.nation.favorite;

    console.log('The selected nation is', this.nation);
    console.log('The selected club is', this.club);
    this.showResult = true;
  }

  private getTeamListOption(nations: Team[], clubs: Team[]) {
    const totalTeam = Math.min(nations.length, clubs.length);
    const dataNations: Team[] = [];
    const dataClubs: Team[] = [];
    for (let i = 0; i < totalTeam; i++) {
      const color = Color.POPULAR_LIST[i % Color.POPULAR_LIST.length];
      dataNations.push({
        index: i,
        name: nations[i].name,
        color: color,
        code: nations[i].code,
      });
      dataClubs.push({
        index: i,
        name: clubs[i].name,
        color: color,
        code: clubs[i].code,
      });
    }

    this.nations = this.originNations = dataNations;
    this.clubs = this.originClubs = dataClubs;
  }

  openTeamSelection() {
    const teamSelectionDialog = this.dialog.open(TeamSelectionComponent, {
      width: '800px',
      disableClose: false,
      data: {
        nations: this.nations,
        clubs: this.clubs,
      },
    });
    teamSelectionDialog.afterClosed().subscribe((result: any) => {
      this.filterTeamSelection(result);
    });
  }

  filterTeamSelection(result: any) {
    if (result) {
      const nations = [];
      const clubs = [];

      result.nations.forEach((team) => {
        nations.push(team.value);
      });
      result.clubs.forEach((team) => {
        clubs.push(team.value);
      });
      console.log(`Dialog result: `, result, nations, clubs);
      this.getTeamListOption(
        nations,
        clubs
      );

      this.redrawPie();
    }
  }

  setFavorite() {
    this.hasFavorite = !this.hasFavorite;

    if (this.hasFavorite) {
      // add to selection
      this.clubs.unshift(this.favoriteTeam);
      this.nations.unshift(this.favoriteTeam);
    } else {
      // remove from selection
      this.clubs.shift();
      this.nations.shift();
    }

    console.log('setFavorite', this.clubs, this.nations);
    this.redrawPie();
  }

  redrawPie() {
    this.wheel.nations = this.nations;
    this.wheel.clubs = this.clubs;
    this.wheel.startDrawPie();
  }

  private isNationType(type: string) {
    return type === 'nation';
  }
}
