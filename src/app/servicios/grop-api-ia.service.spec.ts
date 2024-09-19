import { TestBed } from '@angular/core/testing';

import { GropApiIAService } from './grop-api-ia.service';

describe('GropApiIAService', () => {
  let service: GropApiIAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GropApiIAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
