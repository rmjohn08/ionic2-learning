import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {AgeValidator} from '../../validators/age';
import {UsernameValidator} from '../../validators/usrname';

@Component({
  templateUrl: 'build/pages/contact-page/contact-page.html'
})
export class ContactPage {
  slideOneForm: ControlGroup;
  slideTwoForm: ControlGroup;

  firstNameChanged: boolean = false;
  lastNameChanged: boolean = false;
  ageChanged: boolean = false;
  userNameChanged: boolean = false;
  privacyCHange:  boolean = false;

  submitAttempt: boolean = false;

  constructor(private _navController: NavController,
      private formBuilder: FormBuilder) {

        this.slideOneForm = formBuilder.group({
          firstName: ['', Validators.compose([Validators.maxLength(30),
            Validators.pattern('[a-zA-Z]*'),
            Validators.required])],
          lastName: ['', Validators.compose([Validators.maxLength(30),
            Validators.pattern('[a-zA-Z]*'),
            Validators.required])],
          age: ['', AgeValidator.isValid]
        });

        this.slideTwoForm = formBuilder.group({
          username: ['', Validators.compose([Validators.required,
            Validators.pattern('[a-zA-Z]*'), UsernameValidator.checkUsername])],
          privacy: ['', Validators.required],
          bio: ['']
        });

  }

  elementChanged(input) {
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
      console.log('field changed '+field);
  }

  save () {
    this.submitAttempt = true;

    if (!this.slideOneForm.valid) {
      console.log('signed up failed');
    } else {
      console.log('success');
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
      
    }
  }
}
