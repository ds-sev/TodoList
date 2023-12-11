import { TaskWordEndingPipe } from './task-word-ending.pipe';
import { TestBed } from '@angular/core/testing';

describe('TaskWordEndingPipe', () => {
  let pipe: TaskWordEndingPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskWordEndingPipe]
    });
    pipe = TestBed.inject(TaskWordEndingPipe);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#ending', () => {
    it('should transform "задача" to "задача" for 1', () => {
      const result = pipe.transform(1);
      expect(result).toBe('задача');
    });
    it('should transform "задача" to "задачи" for 2', () => {
      const result = pipe.transform(2);
      expect(result).toBe('задачи');
    });

    it('should transform "задача" to "задачи" for 3', () => {
      const result = pipe.transform(3);
      expect(result).toBe('задачи');
    });

    it('should transform "задача" to "задачи" for 4', () => {
      const result = pipe.transform(4);
      expect(result).toBe('задачи');
    });
    it('should transform "задача" to "задач" for 5', () => {
      const result = pipe.transform(5);
      expect(result).toBe('задач');
    });
  });
});
