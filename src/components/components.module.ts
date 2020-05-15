import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseTeamComponent } from './choose-team/choose-team.component';
import { MatModule } from 'src/app/cores/mat.module';
import { WheelComponent } from './wheel/wheel.component';

const DECLARATIONS = [
  ChooseTeamComponent,
  WheelComponent,
];

@NgModule({
  declarations: [...DECLARATIONS, ],
  imports: [
    CommonModule,
    MatModule,
  ],
  exports: [...DECLARATIONS]
})
export class ComponentsModule { }
