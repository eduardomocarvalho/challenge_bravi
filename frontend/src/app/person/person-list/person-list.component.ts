import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: any[] = [];

  constructor(private personService: PersonService, public router: Router) { }

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe((data: any[]) => {
      this.persons = data;
    });
  }

  editPerson(id: string): void {
    this.router.navigate(['/persons/edit', id]);
  }

  deletePerson(id: string): void {
    this.personService.deletePerson(id).subscribe(() => {
      this.persons = this.persons.filter(person => person.id !== id);
    });
  }
}
