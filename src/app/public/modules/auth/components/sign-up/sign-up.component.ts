import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { UserData } from 'src/app/private/modules/dashboard/models/user.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  users: UserData[] = [ ] as UserData[]

  newUser: UserData = {} as UserData

  constructor(private _fb: FormBuilder, private registerService: RegisterService, public router: Router, private _snackBar: MatSnackBar) {}

  signUpForm: FormGroup = this._fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[ñÑa-zA-Z ]*$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[ñÑa-zA-Z ]*$'),
        ],
      ],
      id: [
        '',
        [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      ],
      birthdate: ['', [Validators.required, this.isAnAdultValidator]],
      mail: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ],
      ],
      secondPassword: ['', [Validators.required]],
    },
    { validators: this.secondPasswordValidator('password', 'secondPassword') }
  );

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.registerService.getAllUsers().subscribe({
      next: users => {
        this.users = users
      },
      error: error => {
        console.log(error);
      }
    });
  }

  isAnAdultValidator(birthdate: FormControl) {
    let birthdateDate = new Date(birthdate.value);
    let today = new Date();
    let userAge = today.getFullYear() - birthdateDate.getFullYear();
    let monthsSubtraction = today.getMonth() - birthdateDate.getMonth();
    let daySubtraction = today.getDate() - birthdateDate.getDate();
    if (
      monthsSubtraction < 0 ||
      (monthsSubtraction == 0 && daySubtraction < 0)
    ) {
      userAge--;
    }
    if (userAge < 18) {
      return { isNotAnAdult: true };
    }
    return null;
  }

  secondPasswordValidator(firstpassword: string, secondpassword: string) {
    return (signUpForm: FormGroup) => {
      let firstPassword = signUpForm.controls[firstpassword];
      let secondPassword = signUpForm.controls[secondpassword];

      if (secondPassword.value !== firstPassword.value) {
        secondPassword.setErrors({ doNotMatch: true });
      } else {
        secondPassword.setErrors(null);
      }
    };
  }
  
  checkEmailExistance(): boolean{
    let emailExists = false
    this.users.forEach(user => {
      if(this.signUpForm.value.mail == user.user_email){
        emailExists = true
      }
    });
    return emailExists
  }

  sendsignUp() {
    if (this.signUpForm.invalid) {
      console.log('form invalid', this.signUpForm.errors);
      this.openSnackBar("Must complete all inputs correctly")
    } else {
      console.log('signup valido');
      if(!this.checkEmailExistance()){
        this.addUser()
      }else{
        this.openSnackBar("That email already exists")
      }
    }
  }

  addUser(){
    this.newUser.user_name = this.signUpForm.value.name
    this.newUser.user_lastname = this.signUpForm.value.lastName
    this.newUser.user_id = this.signUpForm.value.id
    this.newUser.user_birthdate = this.signUpForm.value.birthdate
    this.newUser.user_email= this.signUpForm.value.mail
    this.newUser.user_password= this.signUpForm.value.password
    this.newUser.user_balance= 0

    this.registerService.addUser(this.newUser).subscribe({
      next: userid => {
        this.router.navigate(['/log-in'])
      },
      error: error => {
        console.log(error);
        this.openSnackBar("Must complete all inputs correctly")
      }
    });
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'ok');
  }


}
