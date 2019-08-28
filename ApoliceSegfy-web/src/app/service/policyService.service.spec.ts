/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PolicyServiceService } from './policyService.service';

describe('Service: PolicyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolicyServiceService]
    });
  });

  it('should ...', inject([PolicyServiceService], (service: PolicyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
