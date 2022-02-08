import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CandidateComponent } from './candidate/candidate.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CandidateComponent
  ],
  imports: [
    SharedModule,
    PanelRoutingModule
  ]
})
export class PanelModule { }
