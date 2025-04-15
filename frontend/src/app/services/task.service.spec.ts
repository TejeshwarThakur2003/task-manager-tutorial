import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:3000/api/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched HTTP calls remain after each test
    httpMock.verify();
  });

  it('should retrieve all tasks (GET)', () => {
    const dummyTasks: Task[] = [
      { _id: '123', name: 'Test Task 1', completed: false },
      { _id: '124', name: 'Test Task 2', completed: true }
    ];

    // Call the service
    service.getTasks().subscribe(tasks => {
      // The response should match the dummy data
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    // Expect that a GET request was made to the correct URL
    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');

    // Respond with the dummyTasks data
    req.flush(dummyTasks);
  });

  it('should create a new task (POST)', () => {
    const newTask: Task = { name: 'New Task from Test', completed: false };
    // Simulate the response returned by backend after creation
    const createdTask: Task = { _id: '125', name: 'New Task from Test', completed: false };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(createdTask);
      expect(task._id).toBeTruthy();  // should have an ID after creation
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    // The request body should contain the new task data
    expect(req.request.body).toEqual(newTask);

    // Flush the created task as the response
    req.flush(createdTask);
  });

  it('should update an existing task (PUT)', () => {
    const taskId = '123';
    const changes = { completed: true };
    // Simulate updated task returned by backend (marked completed)
    const updatedTask: Task = { _id: taskId, name: 'Test Task 1', completed: true };

    service.updateTask(taskId, changes).subscribe(task => {
      expect(task.completed).toBeTrue();
    });

    const req = httpMock.expectOne(`${API_URL}/${taskId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(changes);

    req.flush(updatedTask);
  });

  it('should delete a task (DELETE)', () => {
    const taskId = '124';
    const deleteResponse = { message: 'Task deleted' };

    service.deleteTask(taskId).subscribe(response => {
      expect(response).toEqual(deleteResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/${taskId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(deleteResponse);
  });
    //EXERCISE:1 Add a method in the TaskService to count the number of tasks that are not completed. This will help us (and our tests) verify that we can easily get statistics from the task list.
});
