import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<Task>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }
    const newTask: Task = { name: this.taskForm.value.name, completed: false };
    this.taskService.createTask(newTask).subscribe({
      next: (createdTask: Task) => {
        this.taskAdded.emit(createdTask);
        this.taskForm.reset();
      },
      error: (err: any) => {
        console.error('Failed to add task', err);
      }
    });
  }
}