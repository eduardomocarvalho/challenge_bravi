import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(
    private personService: PersonService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getPeople().subscribe((data: Person[]) => {
      this.persons = data;
    });
  }

  editPerson(id: string): void {
    this.router.navigate(['/persons/edit', id]);
  }

  deletePerson(id: string): void {
    this.personService.deletePerson(id).subscribe(() => {
      this.getPersons();
    });
  }
}
