import { UserData } from 'src/app/private/modules/dashboard/models/user.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  userLogged: UserData;

  constructor(private _fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  loginForm: FormGroup = this._fb.group({
    mail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  sendLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log("form invalido")
    }else{
      console.log("login valido")
      this.guardarUsuario()
    }
    
  }

  guardarUsuario() {
    const email = this.loginForm.value.mail;
    const password = this.loginForm.value.password;
    console.log("1")
    this.loginService.getUserLogged(email, password).subscribe({
      next: user => {
        console.log("2")
        sessionStorage.setItem('user_id', user.user_id);
        this.userLogged = user;
      
        this.redirection(this.userLogged)
      },
      error: error => {
        console.log(error);
        alert("login no valido")
      }
    });
  }


  redirection(userLogged: UserData) {
    if (userLogged) {
      console.log('funciona');
      this.router.navigate(['/home'])
    } else {
      console.log('else del redirection');
    }
  }

}
