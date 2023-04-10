import { Component, OnInit } from '@angular/core';
import { UserData } from '../../models/user-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: UserData = {
    user_id: "1",
    user_name: "Barbara",
    user_lastname: "Rodri",
    user_password: "123",
    user_email: "a@a.com",
    user_balance: 1000,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
