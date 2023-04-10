import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}

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

  ngOnInit(): void {}

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

  sendsignUp() {
    if (this.signUpForm.invalid) {
      console.log('form invalid', this.signUpForm.errors);
    } else {
      console.log('signup valido');
    }
  }
}
