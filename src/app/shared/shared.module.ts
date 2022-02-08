import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from './materials/materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Round1Pipe } from './pipes/round1.pipe';
import { Round2Pipe } from './pipes/round2.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { Round1StatusPipe } from './pipes/round1-status.pipe';
import { Round2StatusPipe } from './pipes/round2-status.pipe';




@NgModule({
  declarations: [
  
    Round1Pipe,
       Round2Pipe,
       FilterComponent,
       Round1StatusPipe,
       Round2StatusPipe
  ],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  exports: [
    CommonModule,
    MaterialsModule,
    FlexLayoutModule,
    Round1Pipe,
    Round2Pipe,
    Round1StatusPipe,
    Round2StatusPipe,
    FilterComponent
  ]
})
export class SharedModule { }
