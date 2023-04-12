import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'src/app/private/modules/dashboard/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor (private http:HttpClient) { }

  addUser(newUser: UserData): Observable<UserData>{
    return this.http.post<UserData>('http://localhost:3000/api/user/add', newUser )
  }

  getAllUsers() : Observable<UserData[]>{
    return this.http.get<UserData[]>('http://localhost:3000/api/user/all')
  }
  
}
