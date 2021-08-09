import { TestBed } from '@angular/core/testing';

import { PostshareService } from './postshare.service';

describe('PostshareService', () => {
  let service: PostshareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostshareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
