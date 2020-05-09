import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseTeamComponent } from './choose-team/choose-team.component';
import { MatModule } from 'src/app/cores/mat.module';
import { WheelComponent } from './wheel/wheel.component';
import { HighchartsChartModule } from 'highcharts-angular';

const DECLARATIONS = [
  ChooseTeamComponent,
  WheelComponent,
];

@NgModule({
  declarations: [...DECLARATIONS, ],
  imports: [
    CommonModule,
    MatModule,
    HighchartsChartModule
  ],
  exports: [...DECLARATIONS]
})
export class ComponentsModule { }
