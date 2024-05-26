import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {
  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private personService: PersonService
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      contacts: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  contacts(): FormArray {
    return this.personForm.get('contacts') as FormArray;
  }

  newContact(): FormGroup {
    return this.fb.group({
      type: ['email', Validators.required],
      value: ['', [Validators.required, Validators.email]]
    });
  }

  addContact(): void {
    this.contacts().push(this.newContact());
  }

  removeContact(i: number): void {
    this.contacts().removeAt(i);
  }

  onContactTypeChange(index: number): void {
    const contact = this.contacts().at(index);
    const valueControl = contact.get('value');
    const typeControl = contact.get('type');
    if (valueControl && typeControl) {
      if (typeControl.value === 'email') {
        valueControl.setValidators([Validators.required, Validators.email]);
      } else {
        valueControl.setValidators([Validators.required, Validators.pattern(/^\(\d{2}\) \d{1} \d{4}-\d{4}$/)]);
      }
      valueControl.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.personService.createPerson(this.personForm.value).subscribe(() => {
        this.router.navigate(['/persons']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/persons']);
  }
}
