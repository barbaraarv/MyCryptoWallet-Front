import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCrypto } from '../models/userCrypto.interface';
import { Crypto, CryptoStock } from '../models/crypto.interface';
import { Observable } from 'rxjs';
import { UserData, UserBalanceData } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor (private http:HttpClient) { }

  getAllUserCryptoOfUser(w_user_id:string): Observable<UserCrypto[]>{
    return this.http.get<UserCrypto[]>('http://localhost:3000/api/usercrypto/get/'+w_user_id)
  }

  getUserCryptoByUserAndCrypto(user_id:string, crypto_id:string): Observable<UserCrypto>{
    return this.http.get<UserCrypto>('http://localhost:3000/api/usercrypto/get/'+user_id+'/'+crypto_id)
  }

  addUserCrypto(userCrypto: UserCrypto): Observable<UserCrypto>{
    return this.http.post<UserCrypto>('http://localhost:3000/api/usercrypto/add', userCrypto )
  }

  updateUserCryptoAmount(userCrypto: UserCrypto): Observable<UserCrypto>{
    return this.http.put<UserCrypto>('http://localhost:3000/api/usercrypto/updateAmount', {userCrypto} )
  }



  getCryptoById(w_crypto_id:string) : Observable<Crypto>{
    return this.http.get<Crypto>('http://localhost:3000/api/crypto/get/'+w_crypto_id)
  }

  getAllCrypto() : Observable<Crypto[]>{
    return this.http.get<Crypto[]>('http://localhost:3000/api/crypto/all')
  }

  updateCryptoStock(crypto: CryptoStock): Observable<CryptoStock>{
    return this.http.put<CryptoStock>('http://localhost:3000/api/crypto/updateStock', {crypto} )
  }

  

  getUserById(user_id:string) : Observable<UserData>{
    return this.http.get<UserData>('http://localhost:3000/api/user/get/'+user_id)
  }

  updateUserBalace(user: UserBalanceData): Observable<UserBalanceData>{
    return this.http.put<UserBalanceData>('http://localhost:3000/api/user/updateBalance', {user} )
  }



}
