import { TestBed } from '@angular/core/testing';

import { GuardisLoginGuard } from './guardis-login.guard';

describe('GuardisLoginGuard', () => {
  let guard: GuardisLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardisLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
