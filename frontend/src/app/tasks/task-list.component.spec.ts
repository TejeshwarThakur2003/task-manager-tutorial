import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

describe('TaskListComponent', () => {
  let fixture: ComponentFixture<TaskListComponent>;
  let component: TaskListComponent;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:3000/api/tasks';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent, HttpClientTestingModule],
      providers: [TaskService]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load tasks on init', () => {
    const dummyTasks: Task[] = [
      { _id: 'a1', name: 'Test Task A', completed: false },
      { _id: 'b2', name: 'Test Task B', completed: true }
    ];

    fixture.detectChanges(); // triggers ngOnInit

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
    fixture.detectChanges();

    expect(component.tasks.length).toBe(2);
    expect(component.tasks).toEqual(dummyTasks);

    const listItems = fixture.nativeElement.querySelectorAll('li.list-group-item');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('Test Task A');
    expect(listItems[1].textContent).toContain('Test Task B');
  });

  it('should call completeTask to update a task status to completed', () => {
    // Setup a task with defined _id
    const task: Task = { _id: 'c3', name: 'Task to Complete', completed: false };
    component.tasks = [task];

    // Spy on updateTask; simulate a fake observable that calls observer.next()
    const spy = spyOn(TestBed.inject(TaskService), 'updateTask').and.callFake(() => {
      return {
        subscribe: (observer: { next: (value: Task) => void; error?: (err: any) => void; }) => {
          observer.next({ _id: task._id, name: task.name, completed: true });
        }
      } as any;
    });

    component.completeTask(task);
    expect(spy).toHaveBeenCalledWith(task._id!, { completed: true });
    expect(task.completed).toBeTrue();
  });

  it('should call deleteTask to remove a task from the list', () => {
    const task1: Task = { _id: 'd4', name: 'Task 1', completed: false };
    const task2: Task = { _id: 'e5', name: 'Task 2', completed: false };
    component.tasks = [task1, task2];

    // Spy on deleteTask; simulate a fake observable that calls observer.next()
    const spy = spyOn(TestBed.inject(TaskService), 'deleteTask').and.callFake(() => {
      return {
        subscribe: (observer: { next: (value: any) => void; error?: (err: any) => void; }) => {
          observer.next({ message: 'Task deleted' });
        }
      } as any;
    });

    component.deleteTask(task1);
    expect(spy).toHaveBeenCalledWith(task1._id!);
    expect(component.tasks.length).toBe(1);
    expect(component.tasks).not.toContain(task1);
  });
/** * 
 * 
 * Exercise: add a test to simulate toggling the filter and verifying that only the expected tasks are returned:
\
//ANSWER:
/** 
  it('should filter out completed tasks when showCompleted is false', () => {
    // Create some dummy tasks. One is incomplete and one is completed.
    const dummyTasks: Task[] = [
      { _id: 't1', name: 'Incomplete Task', completed: false },
      { _id: 't2', name: 'Completed Task', completed: true }
    ];
  
    // Trigger ngOnInit() by calling detectChanges(), which will make the GET request.
    fixture.detectChanges();
  
    // Capture the GET request to load tasks and flush our dummyTasks array.
    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  
    // Now update the component view.
    fixture.detectChanges();
  
    // For this exercise, we're testing the filtering functionality.
    // Set the flag to hide completed tasks.
    component.showCompleted = false;
  
    // Now, filteredTasks should only contain the incomplete task.
    expect(component.filteredTasks).toEqual([{ _id: 't1', name: 'Incomplete Task', completed: false }]);
  });
  */
});