import { TestBed } from '@angular/core/testing';

import { AnimationService } from './animation.service';

describe('LikeService', () => {
  let service: AnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
