import { LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TensorModel } from 'src/app/models/TensorModel';
import { User } from 'src/app/models/User';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';
import { ErrorComponent } from '../../error/error.component';

import { ExploreTensorModelsComponent } from './explore-tensor-models.component';

describe('ExploreTensorModelsComponent', () => {
  let component: ExploreTensorModelsComponent;
  let fixture: ComponentFixture<ExploreTensorModelsComponent>;
  let getTensorModelsSpy;

  // Mock Data
  const mockAuthtoken = '12345abcde';
  const mockUser = {
    _id: '6250306544d75fa812892a72',
    username: 'paashaas',
  };

  const mockTensorModels = [
    new TensorModel(
      '625038a544d75fa812892b56',
      'Iris classification',
      new Date('2022-04-08T10:53:42.018Z'),
      new Date(),
      'A classic case.',
      0,
      1,
      ['Input', 'Conv2D', 'Conv2D', 'DNN', 'Class output'],
      123,
      0.54,
      0,
      0,
      new User('6250306544d75fa812892a72', 'paashaas', '', '', new Date(), []),
      []
    ),
    new TensorModel(
      '625038a544d75fa812894444',
      'Iris classification',
      new Date('2022-04-07T10:53:42.018Z'),
      new Date(),
      'A classic case.',
      0,
      1,
      ['Input'],
      123,
      0.54,
      0,
      0,
      new User('6250306544d75fa812894444', 'henk01', '', '', new Date(), []),
      []
    ),
  ];

  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authtoken', mockAuthtoken);
    localStorage.setItem('_id', mockUser._id);

    // Create SpyObj Service
    const tensorModelService = jasmine.createSpyObj('TensorModelService', [
      'getTensorModels',
    ]);

    getTensorModelsSpy = tensorModelService.getTensorModels.and.returnValue(
      of(mockTensorModels)
    );

    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        BrowserTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: '404',
            component: ErrorComponent,
          },
        ]),
      ],
      declarations: [ExploreTensorModelsComponent],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: TensorModelService, useValue: tensorModelService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreTensorModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all Tensor Models', () => {
    component.getTensorModels();

    expect(component.tensorModels).toBeTruthy();
    expect(component.tensorModels?.length).toEqual(mockTensorModels.length);
  });
});
