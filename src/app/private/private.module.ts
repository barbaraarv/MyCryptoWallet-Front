import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    DashboardModule
  ]
})
export class PrivateModule { }
