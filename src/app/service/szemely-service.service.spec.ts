import { TestBed } from '@angular/core/testing';

import { SzemelyServiceService } from './szemely-service.service';

describe('SzemelyServiceService', () => {
  let service: SzemelyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzemelyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
