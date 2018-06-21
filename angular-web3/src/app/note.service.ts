import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { NoteComponent } from './note/note.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteService {

  private notesUri = 'http://localhost:64852/api/notes';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET notes from the server */
  getNotes (): Observable<NoteComponent[]> {
    return this.http.get<NoteComponent[]>(this.notesUri);
  }

  /** GET hero by id. Will 404 if id not found */
  getNote(id: number): Observable<NoteComponent> {
    const url = `${this.notesUri}/${id}`;
    return this.http.get<NoteComponent>(url);
  }


  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addNote (note: NoteComponent): Observable<NoteComponent> {
    return this.http.post<NoteComponent>(this.notesUri, note, httpOptions);
  }

  /** DELETE: delete the hero from the server */
  deleteNote (id: number): Observable<NoteComponent> {
    const url = `${this.notesUri}/${id}`;
    return this.http.delete<NoteComponent>(url, httpOptions);
  }

  /** PUT: update the hero on the server */
  updateNote (note: NoteComponent): Observable<any> {
    return this.http.put(this.notesUri, note, httpOptions);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
