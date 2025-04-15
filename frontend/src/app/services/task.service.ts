import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Base URL for the tasks API
  private readonly baseUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  /** GET all tasks */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  /** POST a new task */
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  /** PUT update to an existing task (e.g., mark completed or edit name) */
  updateTask(taskId: string, changes: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${taskId}`, changes);
  }

  /** DELETE a task by ID */
  deleteTask(taskId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${taskId}`);
  }

  // EXERCISE:1 Create a new method called getPendingTasksCount. It should accept a parameter tasks: Task[] and return a number.
}
