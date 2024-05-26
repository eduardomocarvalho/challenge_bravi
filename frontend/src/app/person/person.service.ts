import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from './person.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'http://localhost/api/people';  // Ajuste para o URL do seu backend

  constructor(private http: HttpClient) {}

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}/${id}`);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl, person).pipe(
      catchError(this.handleError)
    );
  }

  updatePerson(id: string, person: Person): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, person).pipe(
      catchError(this.handleError)
    );
  }

  deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    return throwError(error.error);  // Return the backend error message
  }
}
