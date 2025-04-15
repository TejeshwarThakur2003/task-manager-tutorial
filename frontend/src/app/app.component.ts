import { Component } from '@angular/core';
import { TaskListComponent } from './tasks/task-list.component';
import { TaskFormComponent } from './tasks/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'frontend';
}