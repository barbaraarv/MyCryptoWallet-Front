import { AddMoneyInBalanceComponent } from './../../components/add-money-in-balance/add-money-in-balance.component';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../../models/user.interface';
import { DashboardService } from '../../services/dashboard.service';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: UserData = { } as UserData

  user_id = "0" 
  user_idFromSS: string | null = sessionStorage.getItem('user_id');

  userBalanceRounded: number

  constructor( private dashboardService: DashboardService, public dialog: MatDialog,  private router: Router) { }

  ngOnInit(): void {
    if(!!this.user_idFromSS){
      this.user_id = this.user_idFromSS
    }
    if(this.user_id!="0")
      this.getUserById()
  }

  getUserById() {
    this.dashboardService.getUserById(this.user_id).subscribe({
      next: user => {
        this.user = user
        this.userBalanceRounded = Number((this.user.user_balance).toFixed(3))
        console.log(this.userBalanceRounded)
      },
      error: error => {
        console.log(error);
      }
    });
  }

  openAddMoneyToWalletDialog() {
    let addBalanceDialog = this.dialog.open(AddMoneyInBalanceComponent);

    addBalanceDialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        window.location.reload();
      }
    });
  }

  logOut(){
    sessionStorage.removeItem('user_id')
    this.router.navigate(['/log-in'])

  }

}
