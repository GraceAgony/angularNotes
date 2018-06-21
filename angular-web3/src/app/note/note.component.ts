///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Inject, Injectable, OnInit} from '@angular/core';
Injectable();

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  title: string;
  text: string;
  id: number;
  date: string;
   constructor(public title1: string, public text1: string, date: string) {
    this.title = title1;
    this.text = text1;
    this.date = date;
  }

  ngOnInit() {
  }

}
