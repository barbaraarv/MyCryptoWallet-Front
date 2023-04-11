import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableComponent } from './components/table/table.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { AddMoneyInBalanceComponent } from './components/add-money-in-balance/add-money-in-balance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BuyCryptoDialogComponent } from './components/buy-crypto-dialog/buy-crypto-dialog.component';




@NgModule({
  declarations: [
    DashboardComponent,
    TableComponent,
    AddMoneyInBalanceComponent,
    BuyCryptoDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule 
  ]
})
export class DashboardModule { }
