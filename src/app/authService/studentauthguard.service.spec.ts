import { TestBed } from '@angular/core/testing';

import { StudentauthguardService } from './studentauthguard.service';

describe('StudentauthguardService', () => {
  let service: StudentauthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentauthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
