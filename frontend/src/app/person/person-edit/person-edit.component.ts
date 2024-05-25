import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;
  personId: string;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      contactType: ['', Validators.required]
    });
    this.personId = '';
  }

  ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('id') || '';
    if (this.personId) {
      this.personService.getPerson(this.personId).subscribe(data => {
        this.personForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.personService.updatePerson(this.personId, this.personForm.value).subscribe(() => {
        this.router.navigate(['/persons']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/persons']);
  }
}
