import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;
  personId: string | null;
  contactTypes = ['email', 'telefone', 'whatsapp'];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      contacts: this.fb.array([])
    });
    this.personId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.personId) {
      this.personService.getPerson(this.personId).subscribe((data: Person) => {
        this.personForm.patchValue({ name: data.name });
        data.contacts.forEach((contact: any) => {
          const contactGroup = this.newContact();
          contactGroup.patchValue({
            type: contact.type,
            value: contact.value
          });
          this.contacts().push(contactGroup);
        });
      }, (error) => {
        this.errorMessage = error.message || 'Erro ao carregar os dados da pessoa';
      });
    }
  }

  getMask(type: string): string {
    switch (type) {
      case 'telefone':
      case 'whatsapp':
        return '(00) 0 0000-0000';
      default:
        return '';
    }
  }
  
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

  removeContact(index: number): void {
    this.contacts().removeAt(index);
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
    if (this.personId) {
      this.personService.updatePerson(this.personId, this.personForm.value).subscribe(
        () => {
          this.router.navigate(['/persons']);
        },
        (error) => {
          this.errorMessage = error.message || 'Ocorreu um erro desconhecido';
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/persons']);
  }
}
