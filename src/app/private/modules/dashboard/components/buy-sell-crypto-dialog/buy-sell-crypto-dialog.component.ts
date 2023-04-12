import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { UserBalanceData, UserData } from '../../models/user.interface';
import { Crypto, CryptoStock } from '../../models/crypto.interface';
import { UserCrypto } from '../../models/userCrypto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-buy-sell-crypto-dialog',
  templateUrl: './buy-sell-crypto-dialog.component.html',
  styleUrls: ['./buy-sell-crypto-dialog.component.scss']
})
export class buySellCryptoDialogComponent implements OnInit {

  action= ""
  actionFromSS: string | null = sessionStorage.getItem('action');

  user_id = "0" 
  user_idFromSS: string | null = sessionStorage.getItem('user_id');

  crypto_id= "0"
  crypto_idFromSS: string | null = sessionStorage.getItem('crypto_id');


  addCryptoForm: FormGroup = this._fb.group({
    crypto: ['', [Validators.required, Validators.min(0.005)]],
  });

  takeCryptoForm: FormGroup = this._fb.group({
    crypto: ['', [Validators.required, Validators.min(0.005)]],
  });


  user: UserData = { } as UserData
  crypto: Crypto = { } as Crypto
  userCrypto: UserCrypto= {} as UserCrypto
  userAlreadyHasCrypto = false
  totalPriceHint = 0

  constructor(private _fb: FormBuilder,private dashboardService: DashboardService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(!!this.actionFromSS){
      this.action = this.actionFromSS
    }
    if(!!this.user_idFromSS){
      this.user_id = this.user_idFromSS
    }
    if(!!this.crypto_idFromSS){
      this.crypto_id = this.crypto_idFromSS
    }
    console.log("cryptoid",this.crypto_id)
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
      this.getCryptoById()
      }
    });
  }

  getCryptoById() {
    this.dashboardService.getCryptoById(this.crypto_id).subscribe({
      next: crypto => {
        this.crypto = crypto
      },
      error: error => {   
        console.log(error); 
      },
      complete: () => {
      console.log(this.crypto)
      this.getUserCrypto()
      }
    });
  }

  getUserCrypto(){
    this.dashboardService.getUserCryptoByUserAndCrypto(this.user_id, this.crypto_id).subscribe({
      next: userCrypto => {
        this.userCrypto = userCrypto
        this.userAlreadyHasCrypto =true
      },
      error: error => {
        console.log("error",error);
        console.log(this.userAlreadyHasCrypto)
      },
      complete: () => {
      console.log("asd",this.userCrypto)
      }
    });
  }


  buyCrypto(){
    if(this.addCryptoForm.valid){
      this.addCryptoToWallet()
    }
  }

  addCryptoToWallet(){
    if(this.addCryptoForm.value.crypto <= this.crypto.crypto_stock){
      let totalPrice = (this.addCryptoForm.value.crypto*this.crypto.crypto_value)
      if(totalPrice<=this.user.user_balance){
          /* if already has */
          if(this.userAlreadyHasCrypto){
            this.updateUserCryptoAmount(this.addCryptoForm.value.crypto)
          }else{
            this.addUserCrypto()
          }
          this.updateUserBalace()
          this.updateCryptoStock(this.addCryptoForm.value.crypto)

      }else{
        this.openSnackBar("theres not enough euros in your wallet, please introduce more money and come back")
      }
      
    }else{
      this.openSnackBar("there is not enough  " + this.crypto.crypto_name + " in stock")
    }
    }

  sellCrypto(){
    if(this.takeCryptoForm.valid){
      this.takeCryptoFromWallet()
    }
  }

  takeCryptoFromWallet(){
    if(this.userCrypto.w_crypto_amount>=this.takeCryptoForm.value.crypto){
      let minusCrypto: number = -(this.takeCryptoForm.value.crypto)
      this.updateUserCryptoAmount(minusCrypto)
      this.updateUserBalace()
      this.updateCryptoStock(minusCrypto)
    }else{
      this.openSnackBar("theres not enough " + this.crypto.crypto_name + " in your wallet")
    }
    
  }

    updateUserCryptoAmount(cryptoAmount:number){
      this.userCrypto.w_crypto_amount += cryptoAmount
      this.dashboardService.updateUserCryptoAmount(this.userCrypto).subscribe({
        next: newUserCrypto => {
          console.log(newUserCrypto)
        },
        error: error => {
          console.log(error);
        },
        complete: () => {
          console.log("listo el update")
        }
      });
    }

    addUserCrypto(){
      let userCryptoToPost: UserCrypto = {} as UserCrypto
      userCryptoToPost.w_crypto_id = this.crypto_id
      userCryptoToPost.w_user_id = this.user_id
      userCryptoToPost.w_crypto_amount = this.addCryptoForm.value.crypto
      this.dashboardService.addUserCrypto(userCryptoToPost).subscribe({
        next: newUserCrypto => {
          console.log(newUserCrypto)
        },
        error: error => {
          console.log(error);
        },
        complete: () => {
          console.log("listo")
        }
      });
    }

    updateUserBalace(){
      let newUserBalance: UserBalanceData = {} as UserBalanceData
      newUserBalance.user_id = this.user_id
      if(this.action=='buy'){
        let totalPrice = (this.addCryptoForm.value.crypto*this.crypto.crypto_value)
        newUserBalance.user_balance = (this.user.user_balance-totalPrice)
      }else{
        let totalPrice = (this.takeCryptoForm.value.crypto*this.crypto.crypto_value)
        newUserBalance.user_balance = (this.user.user_balance+totalPrice)
      }
      this.dashboardService.updateUserBalace(newUserBalance).subscribe({
        next: userBalance => {
          console.log(userBalance)
        },
        error: error => {
          console.log(error);
        },
        complete: () => {
          console.log("listo")
        }
      });
    }

    updateCryptoStock(cryptoAmount: number){
      let cryptoStock: CryptoStock = {} as CryptoStock
      cryptoStock.crypto_id = this.crypto_id
      cryptoStock.crypto_stock = (this.crypto.crypto_stock-cryptoAmount)

      this.dashboardService.updateCryptoStock(cryptoStock).subscribe({
        next: userBalance => {
          console.log(userBalance)
        },
        error: error => {
          console.log(error);
        },
        complete: () => {
          console.log("listo")
        }
      });
    }

    getTotalPrice(value:string){
      console.log(value)
      this.totalPriceHint = Number((Number(value)*this.crypto.crypto_value).toFixed(2))
    }

    openSnackBar(text: string) {
      this._snackBar.open(text, 'ok');
    }
}