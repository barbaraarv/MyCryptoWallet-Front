import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './../../services/dashboard.service';
import { UserBalanceData, UserData } from '../../models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-money-in-balance',
  templateUrl: './add-money-in-balance.component.html',
  styleUrls: ['./add-money-in-balance.component.scss']
})
export class AddMoneyInBalanceComponent implements OnInit {


  user_id = "0" 
  user_idFromSS: string | null = sessionStorage.getItem('user_id');

  user: UserData = { } as UserData
  userBalanceData: UserBalanceData = {} as UserBalanceData

  constructor(private _fb: FormBuilder, private dashboardService: DashboardService, private _snackBar: MatSnackBar) { }

  addMoneyForm: FormGroup = this._fb.group({
    euros: ['', [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    if(!!this.user_idFromSS){
      this.user_id = this.user_idFromSS
    }
    this.getUserById()
  }

  getUserById() {
    this.dashboardService.getUserById(this.user_id).subscribe({
      next: user => {
        this.user = user
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
      console.log(this.user)
      }
    });
  }

  addMoney(){
    if(this.addMoneyForm.valid){
      this.addMoneyToBalance()
      this.openSnackBar("Your balance has been updated")
    }
  }

  addMoneyToBalance(){
    this.userBalanceData.user_id = this.user_id
    this.userBalanceData.user_balance = (this.user.user_balance+this.addMoneyForm.value.euros)
    this.dashboardService.updateUserBalace(this.userBalanceData).subscribe({
      next: userNewBalance => {
        console.log(userNewBalance)
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log("listo")
      }
    });
  }
  openSnackBar(text: string) {
    this._snackBar.open(text, 'ok');
  }

}
