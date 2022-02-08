import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoggedinGuard } from './guards/loggedin/loggedin.guard';



const routes: Routes = [
  {path:'', component: HomeComponent, pathMatch: 'full', canActivate: [LoggedinGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
