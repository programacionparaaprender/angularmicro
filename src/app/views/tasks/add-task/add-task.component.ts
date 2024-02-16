
// Importaciones
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/commons/store/app.state';
import * as TaskActions from 'src/app/commons/store/tasks.actions';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  // Disparamos la acción
  addTask(name: string, state: string) {
    this.store.dispatch(new TaskActions.AddTask({name: name, state: state}) )
  }

}
