import { TestBed, inject } from '@angular/core/testing';

import { FairService } from './fair.service';

describe('FairService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FairService]
    });
  });

  it('should be created', inject([FairService], (service: FairService) => {
    expect(service).toBeTruthy();
  }));
});
