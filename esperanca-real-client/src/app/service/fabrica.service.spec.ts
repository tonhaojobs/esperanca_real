import { TestBed } from '@angular/core/testing';

import { FabricaService } from './fabrica.service';

describe('FabricaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FabricaService = TestBed.get(FabricaService);
    expect(service).toBeTruthy();
  });
});
