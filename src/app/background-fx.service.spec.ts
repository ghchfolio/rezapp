import { TestBed } from '@angular/core/testing';

import { BackgroundFxService } from './background-fx.service';

describe('BackgroundFxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackgroundFxService = TestBed.get(BackgroundFxService);
    expect(service).toBeTruthy();
  });
});
