import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  registerForm: FormGroup = this.fb.group({
    'name': ['', Validators.required],
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
    console.log('userobj', userObj)
  }

}
