import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  accountCreated: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  registerForm: FormGroup = this.fb.group({
    'name': ['', [Validators.required, Validators.email]],
    'password': ['', Validators.required]
  })

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let userObj = this.registerForm.value;
    console.log('userobj', userObj);
    this.authService.registerUser(userObj)
      .subscribe(data => {
        console.log('data', data);
        this.accountCreated = true
      })
  }

}
