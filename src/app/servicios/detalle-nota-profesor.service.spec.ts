import { TestBed } from '@angular/core/testing';

import { DetalleNotaProfesorService } from './detalle-nota-profesor.service';

describe('DetalleNotaProfesorService', () => {
  let service: DetalleNotaProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleNotaProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
