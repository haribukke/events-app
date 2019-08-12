import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
  showStep1Errors: boolean = false;
  showStep2Errors: boolean = false;
  showStep3Errors: boolean = false;
  id: number;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.router.url.includes('edit-event')) {
      this.route.paramMap.subscribe(param => {
        this.id = +param.get('id')
        this.eventsService.getEventData(this.id)
          .subscribe((data: any) => {
            console.log('data', data)
            /**
             * if the event is created by the logged in user, he can edit
             * Else he would be navigated to dashboard
             */
            if (data.event[0].createdBy == this.authService.getUserId()) {
              this.populateForm(data.event[0]);
            }
            else {
              this.router.navigateByUrl('/dashboard');
            }
          })
      })
    }
  }

  /**
   * creating event form
   */

  eventForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    duration: [''],
    date: ['', Validators.required],
    location: ['', Validators.required],
    fees: [''],
    tags: [''],
    maxParticipants: [''],
    createdBy: ['']
  })

  /**
   * populating event form in edit mode
   */

  populateForm(data) {
    this.eventForm.patchValue({
      id: data.id,
      name: data.name,
      description: data.description,
      duration: data.duration,
      date: data.date,
      location: data.location,
      fees: data.fees,
      tags: data.tags,
      maxParticipants: data.maxParticipants,
      createdBy: data.createdBy
    })
  }

  /**
   * getter function to access formcontrols in template for validations
   */

  get f() {
    return this.eventForm.controls;
  }

  /**
   * next function to move through stages of event creation
   */

  next(newStep, currentStep) {

    if (currentStep == 'step1' &&
      (this.eventForm.controls.name.status == 'INVALID' ||
        this.eventForm.controls.description.status == 'INVALID')) {
      this.showStep1Errors = true;
      return
    }
    if (currentStep == 'step2' &&
      (this.eventForm.controls.date.status == 'INVALID' ||
        this.eventForm.controls.location.status == 'INVALID')) {
      this.showStep2Errors = true;
      return
    }
    this[newStep] = true;
    this[currentStep] = false;
  }

  /**
   * to go back to previous step during form creation
   */

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

  /**
   * create event called after all details are filled. 
   * If form is invalid, would show error
   * if event creation is successful, would navigate back to dashboard
   */

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

  /**
   * Same as create event
   */

  updateEvent() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return
    }
    this.eventsService.updateEvent(this.eventForm.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/dashboard')
      })
  }
  /**
   * delete event
   */

   deleteEvent(){
     this.eventsService.deleteEvent(this.id)
      .subscribe(data=>{
        this.router.navigateByUrl('/dashboard')
     })
   }
}
