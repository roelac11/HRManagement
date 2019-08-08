import { TestBed, async, inject } from '@angular/core/testing';

import { MainPageGuard } from './main-page.guard';

describe('MainPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainPageGuard]
    });
  });

  it('should ...', inject([MainPageGuard], (guard: MainPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
