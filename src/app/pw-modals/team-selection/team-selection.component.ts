import { ITeam } from './../../models/team';
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamSelectionData } from './team-selection-data';
import { TeamService } from 'src/services/team.service';

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.scss'],
})
export class TeamSelectionComponent implements OnInit, AfterViewChecked {
  allNations: ITeam[];
  nations: ITeam[];
  allClubs: ITeam[];
  clubs: ITeam[];

  @ViewChild('nationSelect', { static: false }) nationSelect;
  @ViewChild('clubSelect', { static: false }) clubSelect;

  constructor(
    private teamService: TeamService,
    public dialogRef: MatDialogRef<TeamSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamSelectionData,
    private cdr: ChangeDetectorRef
  ) {
    console.log(data);
    this.allNations = this.teamService.defaultNations;
    this.allClubs = this.teamService.defaultClubs;
    this.nations = data.nations;
    this.clubs = data.clubs;
    // this.cdr.checkNoChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  checkNationSelected(nationCode) {
    return this.nations.findIndex((i) => i.code === nationCode) >= 0;
  }

  checkClubSelected(nationCode) {
    return this.clubs.findIndex((i) => i.code === nationCode) >= 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onselectClose() {
    debugger;
    return;
    return {
      nations: this.nationSelect.selectedOptions.selected,
      clubs: this.clubSelect.selectedOptions.selected,
    };
  }

  ngOnInit(): void {}
}
