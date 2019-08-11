import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  submitted: boolean = false;
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  eventForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    duration: [''],
    date: ['', Validators.required],
    location: ['', Validators.required],
    fees: [''],
    tags: [''],
    maxParticipants: [''],
  })

  next(newStep, currentStep) {
    this[newStep] = true;
    this[currentStep] = false;
  }

  prevStep() {
    if (this.step2) {
      this.step1 = true;
      this.step2 = false;
    }
    if (this.step3) {
      this.step2 = true;
      this.step3 = false;
    }
  }

  createEvent() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return
    }
    console.log('form val', this.eventForm.value)
    this.eventsService.createEvent(this.eventForm.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/dashboard')
      })
  }
}
