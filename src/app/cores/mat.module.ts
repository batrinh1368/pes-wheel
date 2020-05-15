import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

const MODULES = [
  MatGridListModule,
  MatSliderModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressBarModule,
  MatButtonModule,
  MatFormFieldModule,
  DragDropModule,
  MatListModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  providers: [],
  bootstrap: [],
  exports: [...MODULES],
})
export class MatModule {}
