import { NgModule } from '@angular/core';

import { HrRoutingModule } from './hr-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateCandidateComponent,
    ProjectComponent,
    CreateProjectComponent,
    ReportComponent
  ],
  imports: [
    SharedModule,
    HrRoutingModule
  ]
})
export class HrModule { }
