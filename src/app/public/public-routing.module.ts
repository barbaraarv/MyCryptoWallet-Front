import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './modules/auth/components/log-in/log-in.component';
import { SignUpComponent } from './modules/auth/components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
