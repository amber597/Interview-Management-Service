import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { HrGuard } from 'src/app/guards/hr/hr.guard';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path:'hrdashboard', component:DashboardComponent, pathMatch: "full", canActivate: [HrGuard] },
  { path:'addCandidate/:projectId', component:CreateCandidateComponent, pathMatch: "full", canActivate: [HrGuard] },
  { path:'addProject', component:CreateProjectComponent, pathMatch: "full", canActivate: [HrGuard] },
  { path:'project/:projectId', component: ProjectComponent, canActivate: [HrGuard] },
  { path:'report', component: ReportComponent, canActivate: [HrGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
