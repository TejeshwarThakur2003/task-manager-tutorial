// Task interface representing the Task document from backend
export interface Task {
    _id?: string;        // MongoDB ID (optional when creating a new task)
    name: string;        // Task description/title
    completed: boolean;  // Completion status
    createdAt?: string;  // Timestamp when created (optional)
    updatedAt?: string;  // Timestamp when last updated (optional)
  }