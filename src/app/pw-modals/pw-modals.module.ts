import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSelectionComponent } from './team-selection/team-selection.component';
import { MatModule } from '../cores/mat.module';
const DECLARATIONS = [TeamSelectionComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, MatModule],
  entryComponents: [...DECLARATIONS],
  exports: [...DECLARATIONS],
})
export class PwModalsModule {}
