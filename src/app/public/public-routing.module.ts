import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './modules/auth/components/log-in/log-in.component';
import { SignUpComponent } from './modules/auth/components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'log-in', component: LogInComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
