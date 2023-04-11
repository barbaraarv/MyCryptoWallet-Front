import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { UserBalanceData, UserData } from '../../models/user.interface';
import { Crypto, CryptoStock } from '../../models/crypto.interface';
import { UserCrypto } from '../../models/userCrypto.interface';


@Component({
  selector: 'app-buy-crypto-dialog',
  templateUrl: './buy-crypto-dialog.component.html',
  styleUrls: ['./buy-crypto-dialog.component.scss']
})
export class BuyCryptoDialogComponent implements OnInit {

  addCryptoForm: FormGroup = this._fb.group({
    crypto: ['', [Validators.required, Validators.min(0.005)]],
  });

  user_id = "0" 
  user_idFromSS: string | null = sessionStorage.getItem('user_id');

  crypto_id= "0"
  crypto_idFromSS: string | null = sessionStorage.getItem('crypto_id');


  user: UserData = { } as UserData
  crypto: Crypto = { } as Crypto
  userCrypto: UserCrypto= {} as UserCrypto

  userAlreadyHasCrypto = false

  constructor(private _fb: FormBuilder,private dashboardService: DashboardService) { }

  ngOnInit(): void {
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
      alert("ok")
      let totalPrice = (this.addCryptoForm.value.crypto*this.crypto.crypto_value)
      if(totalPrice<=this.user.user_balance){
          alert("ok")

          /* if already has */
          if(this.userAlreadyHasCrypto){
            this.updateUserCryptoAmount()
          }else{
            this.addUserCrypto()
          }
          this.updateUserBalace()
          this.updateCryptoStock()

      }else{
        alert("theres not enought euros in your wallet, please introduce more money and come back")
      }
      
    }else{
      alert("there is not enought " + this.crypto.crypto_name + " en stock")
    }

    }

    updateUserCryptoAmount(){
      console.log(this.userCrypto.w_crypto_amount)
      this.userCrypto.w_crypto_amount += this.addCryptoForm.value.crypto
      console.log(this.userCrypto.w_crypto_amount)
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
      let totalPrice = (this.addCryptoForm.value.crypto*this.crypto.crypto_value)

      let newUserBalance: UserBalanceData = {} as UserBalanceData
      newUserBalance.user_id = this.user_id
      newUserBalance.user_balance = (this.user.user_balance-totalPrice)
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

    updateCryptoStock(){
      let cryptoStock: CryptoStock = {} as CryptoStock
      cryptoStock.crypto_id = this.crypto_id
      cryptoStock.crypto_stock = (this.crypto.crypto_stock-this.addCryptoForm.value.crypto)

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
}