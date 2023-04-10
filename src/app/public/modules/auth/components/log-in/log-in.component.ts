import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

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
    }

    
  }

}
