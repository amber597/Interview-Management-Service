import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth/auth.guard";
import { LoggedinGuard } from "../guards/loggedin/loggedin.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { NotAssignedComponent } from "./not-assigned/not-assigned.component";
import { RegisterComponent } from "./register/register.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch:'full', canActivate: [LoggedinGuard]},
  { path: 'register', component: RegisterComponent, pathMatch:'full', canActivate: [LoggedinGuard]},
  { path: 'dashboard', component: DashboardComponent, pathMatch:'full', canActivate: [AuthGuard] },
  { path: 'notassigned', component: NotAssignedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
