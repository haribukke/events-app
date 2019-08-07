import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    'name': ['', [Validators.required, Validators.email]],
    'password': ['', Validators.required]
  })

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let userObj = this.loginForm.value;
    this.authenticationService.login(userObj)
      .subscribe((data: any) => {
        this.authenticationService.setToken(data.token);
        this.authenticationService.setUserId(data.id);
        this.router.navigateByUrl('/dashboard');
      }, err => {
        console.log(err, err.error.message)
      })

  }

}
