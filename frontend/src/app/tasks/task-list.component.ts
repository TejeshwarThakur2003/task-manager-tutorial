import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (taskArray: Task[]) => {
        this.tasks = taskArray;
      },
      error: (err: any) => {
        console.error('Failed to load tasks', err);
      }
    });
  }

  completeTask(task: Task): void {
    if (task.completed) return;
    this.taskService.updateTask(task._id!, { completed: true }).subscribe({
      next: (updated: Task) => {
        task.completed = updated.completed;
      },
      error: (err: any) => {
        console.error('Failed to complete task', err);
      }
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id!).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t._id !== task._id);
      },
      error: (err: any) => {
        console.error('Failed to delete task', err);
      }
    });
  }
}