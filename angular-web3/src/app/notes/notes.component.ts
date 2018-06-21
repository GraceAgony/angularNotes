import { Component, OnInit } from '@angular/core';
import {NoteComponent} from '../note/note.component';
import {NoteService} from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
 public notes: Array<NoteComponent>;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
   this.getNotes();
  }
  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  add(title: string, text: string): void {
    title = title.trim();
    text = text.trim();
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const date = '' + day + '-' + month + '-' + year;
    if (!title) { return; }
    let maxId = this.notes[0].id;
    this.notes.forEach(function (item) {
      if ( item.id > maxId ) {
        maxId = item.id;
      }
      });
    const id = maxId + 1;
    this.noteService.addNote({ title, text, date, id } as NoteComponent)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  delete(note: NoteComponent): void {
    this.notes = this.notes.filter(h => h !== note);
    this.noteService.deleteNote(note.id).subscribe();
  }

}
