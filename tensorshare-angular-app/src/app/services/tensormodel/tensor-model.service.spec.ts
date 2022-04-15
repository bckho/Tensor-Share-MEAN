import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TensorModelService } from './tensor-model.service';

describe('TensorModelService', () => {
  let service: TensorModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TensorModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
