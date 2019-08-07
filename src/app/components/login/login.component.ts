import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    'name': ['', Validators.required],
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
    console.log('userobj', userObj);
    this.router.navigateByUrl('/dashboard')
  }

}
