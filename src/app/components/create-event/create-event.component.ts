import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass']
})
export class CreateEventComponent implements OnInit {

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  eventForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    duration: [''],
    location: ['', Validators.required],
    fees: [''],
    tags: [''],
    maxParticipants: [''],
  })

  createEvent() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return
    }
    console.log('form val', this.eventForm.value)
  }
}
