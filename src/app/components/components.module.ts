import { NgModule } from '@angular/core';

import { ComponentsRoutingModule } from './components-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HrModule } from './hr/hr.module';
import { PanelModule } from './panel/panel.module';
import { AdminModule } from './admin/admin.module';
import { NotAssignedComponent } from './not-assigned/not-assigned.component';





@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    NavBarComponent,
    NotAssignedComponent,
  ],
  imports: [
    SharedModule,
    ComponentsRoutingModule,
    HrModule,
    PanelModule,
    AdminModule,
    
  ],
  exports: [
    NavBarComponent,
  ]
})
export class ComponentsModule { }
