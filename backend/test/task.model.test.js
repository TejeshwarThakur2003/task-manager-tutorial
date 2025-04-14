// backend/test/task.model.test.js
const chai = require('chai');
const expect = chai.expect;
const Task = require('../models/Task');

describe('Task Model', () => {
  it('should default "completed" to false', () => {
    const task = new Task({ name: 'Sample Task' });  // not saved to DB, just an instance
    expect(task.completed).to.be.false;
  });

  it('should require a name field', () => {
    const task = new Task();  // no name provided
    const error = task.validateSync();  // synchronous validation
    expect(error.errors).to.have.property('name');
    expect(error.errors.name.kind).to.equal('required');
  });
});