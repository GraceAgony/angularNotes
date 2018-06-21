import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes/notes.component';
import { NoteDetailsComponent} from './note-details/note-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full'},
  { path: 'detail/:id', component: NoteDetailsComponent },
  { path: 'notes', component: NotesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
