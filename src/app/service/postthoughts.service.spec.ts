import { TestBed } from '@angular/core/testing';

import { PostthoughtsService } from './postthoughts.service';

describe('PostthoughtsService', () => {
  let service: PostthoughtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostthoughtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
