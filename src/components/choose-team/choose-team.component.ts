import { Color } from './../../app/models/color';
import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-choose-team',
  templateUrl: './choose-team.component.html',
  styleUrls: ['./choose-team.component.scss']
})
export class ChooseTeamComponent implements OnInit {
  @Input() label: string;
  @Input() teams: Team[];

  constructor() { }

  ngOnInit(): void {
  }

  dropTeam(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.teams, event.previousIndex, event.currentIndex);
    this.teams.forEach((team, index) => {
      team.color = Color.POPULAR_LIST[index];
    })
  }

}
