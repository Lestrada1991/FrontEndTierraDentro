import { TestBed } from '@angular/core/testing';

import { DocumentosService } from './documentos.service';

describe('ProductService', () => {
  let service: DocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
