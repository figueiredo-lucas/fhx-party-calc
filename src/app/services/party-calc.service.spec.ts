import { TestBed } from '@angular/core/testing';

import { PartyCalcService } from './party-calc.service';

describe('PartyCalcService', () => {
  let service: PartyCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
