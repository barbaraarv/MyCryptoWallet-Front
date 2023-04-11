import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'src/app/private/modules/dashboard/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor (private http:HttpClient) { }

  getUserLogged(user_email:string, user_password: string){
    return this.http.get<UserData>('http://localhost:3000/api/user/get/'+user_email+'/'+user_password)
  }
}
