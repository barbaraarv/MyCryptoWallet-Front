import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableComponent } from './components/table/table.component';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    DashboardComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
