import { Component, OnInit, Input } from '@angular/core';
import {NoteComponent} from '../note/note.component';
import {NoteService} from '../note.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  @Input() note: NoteComponent;

  constructor(private route: ActivatedRoute,
              private noteService: NoteService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.noteService.getNote(id)
      .subscribe(note => this.note = note);
  }

  goBack(): void {
    this.location.back();
  }
}

