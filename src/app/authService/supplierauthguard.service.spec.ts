import { TestBed } from '@angular/core/testing';

import { SupplierauthguardService } from './supplierauthguard.service';

describe('SupplierauthguardService', () => {
  let service: SupplierauthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierauthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
