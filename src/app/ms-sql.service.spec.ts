import { TestBed } from '@angular/core/testing';

import { MsSQLService } from './ms-sql.service';

describe('MsSQLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsSQLService = TestBed.get(MsSQLService);
    expect(service).toBeTruthy();
  });
});
