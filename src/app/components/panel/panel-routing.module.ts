import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { PanelGuard } from 'src/app/guards/panel/panel.guard';
import { CandidateComponent } from './candidate/candidate.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'paneldashboard', component: DashboardComponent, canActivate: [PanelGuard]},
  { path:'candidate/:candidateId', component:CandidateComponent, canActivate: [PanelGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
