import { TestBed } from '@angular/core/testing';

import { PassDataService } from './pass-data.service';

describe('PassDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassDataService = TestBed.get(PassDataService);
    expect(service).toBeTruthy();
  });
});
