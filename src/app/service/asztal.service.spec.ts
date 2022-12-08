import { TestBed } from '@angular/core/testing';

import { AsztalService } from './asztal.service';

describe('AsztalService', () => {
  let service: AsztalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsztalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
