import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'admindashboard', component: DashboardComponent, canActivate: [AdminGuard]},
  {path: 'updateuser/:userId', component: UserComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
