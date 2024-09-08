import { TestBed } from '@angular/core/testing';

import { rxdbService } from './rxdb.service';

describe('rxdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: rxdbService = TestBed.get(rxdbService);
    expect(service).toBeTruthy();
  });
});
