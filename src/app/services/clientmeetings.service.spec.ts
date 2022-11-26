import { TestBed } from '@angular/core/testing';

import { ClientmeetingsService } from './clientmeetings.service';

describe('ClientmeetingsService', () => {
  let service: ClientmeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientmeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
