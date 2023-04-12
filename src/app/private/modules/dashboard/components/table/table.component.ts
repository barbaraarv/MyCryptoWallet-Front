import { UserTable } from './../../models/userTable.interface';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Crypto } from './../../models/crypto.interface'
import { UserCrypto } from './../../models/userCrypto.interface';
import { MatDialog } from '@angular/material/dialog';
import { buySellCryptoDialogComponent } from '../buy-sell-crypto-dialog/buy-sell-crypto-dialog.component';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  user_id = "0" 
  user_idFromSS: string | null = sessionStorage.getItem('user_id');

  displayedColumns: string[] = ['crypto_name', 'crypto_value', 'crypto_stock', 'user_amount', 'user_actions'];
  
  cryptoTableData: UserTable[] = []
  cryptoData: UserTable[] = []

  allCrypto: Crypto[] = []
  allUserCryptos: UserCrypto[] = []

  constructor(private dashboardService: DashboardService,  public dialog: MatDialog) {}

  ngOnInit() {
    if(!!this.user_idFromSS){
      this.user_id = this.user_idFromSS
    }
    this.getUserCryptos()
  }
  
  getUserCryptos() {
    
    this.dashboardService.getAllUserCryptoOfUser(this.user_id).subscribe({
      next: userCryptos => {
        this.allUserCryptos = userCryptos
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        this.getAllCrypto();
      }
    });
  }

  getAllCrypto() {
    this.dashboardService.getAllCrypto().subscribe({
      next: cryptos => {
        this.allCrypto = cryptos
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        
        this.tableJoin()
        this.cryptoTableData = this.cryptoData
      }
    });
  }
  isDataReady = false;

  tableJoin(){
    var userTableData: UserTable
    for (var i = 0 ; i<this.allCrypto.length ; i++){
      userTableData = {
        crypto_id: this.allCrypto[i].crypto_id,
        crypto_name: this.allCrypto[i].crypto_name,
        crypto_value: this.allCrypto[i].crypto_value,
        crypto_stock: this.allCrypto[i].crypto_stock,
        user_amount: 0
      }
      this.cryptoData.push(userTableData)
    }
    if(!!this.allUserCryptos[0]){
      this.getUserAmountIntoTable(this.cryptoData, this.allUserCryptos)
    }
    setTimeout(() =>{
      this.isDataReady = true;
    },1000)
    
  }
  

  getUserAmountIntoTable(cryptoData: UserTable[], allUserCryptos: UserCrypto[]){
  
      for (var i = 0 ; i < cryptoData.length ; i++){
        for (var j = 0 ; j < allUserCryptos.length ; j++){
          if (cryptoData[i].crypto_id == allUserCryptos[j].w_crypto_id){
            cryptoData[i].user_amount = allUserCryptos[j].w_crypto_amount
          }
        }
      }
  }

  buySellCryptoDialog(crypto_id: string, action:string){

  sessionStorage.setItem('crypto_id', crypto_id);
  sessionStorage.setItem('action', action);
  let butCryptoDialog = this.dialog.open(buySellCryptoDialogComponent);

  butCryptoDialog.afterClosed().subscribe(result => {
    sessionStorage.removeItem('crypto_id')
    sessionStorage.removeItem('action')
    console.log(`Dialog result: ${result}`);
    if(result){
      setTimeout(function(){
        window.location.reload()
      },1000)
      
    }
  });

  }


  

}
