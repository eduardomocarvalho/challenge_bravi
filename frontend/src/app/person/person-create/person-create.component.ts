import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private personService: PersonService,
    public router: Router // Alterado para public
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      contactType: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.personForm.valid) {
      this.personService.addPerson(this.personForm.value).subscribe(() => {
        this.router.navigate(['/persons']);
      });
    }
  }

  onContactTypeChange(): void {
    const contactControl = this.personForm.get('contact');
    const contactType = this.personForm.get('contactType')?.value;

    if (contactType === 'phone' || contactType === 'whatsapp') {
      contactControl?.setValidators([Validators.required, Validators.pattern(/^\(\d{2}\) \d{1} \d{4}-\d{4}$/)]);
    } else if (contactType === 'email') {
      contactControl?.setValidators([Validators.required, Validators.email]);
    } else {
      contactControl?.clearValidators();
    }

    contactControl?.updateValueAndValidity();
  }
}
