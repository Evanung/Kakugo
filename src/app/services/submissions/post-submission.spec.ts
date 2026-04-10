import { TestBed } from '@angular/core/testing';

import { PostSubmission } from './post-submission';

describe('PostSubmission', () => {
  let service: PostSubmission;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSubmission);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
