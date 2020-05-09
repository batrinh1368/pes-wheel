import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

const MODULES = [
  MatGridListModule,
  MatSliderModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressBarModule,
  MatButtonModule,
  DragDropModule,
];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  providers: [],
  bootstrap: [],
  exports: [...MODULES],
})
export class MatModule {}
