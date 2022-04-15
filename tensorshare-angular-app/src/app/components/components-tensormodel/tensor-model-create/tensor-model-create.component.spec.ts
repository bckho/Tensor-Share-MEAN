import { Location, LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryEnum } from 'src/app/models/CategoryEnum';
import { ModelTypeEnum } from 'src/app/models/ModelTypeEnum';
import { TensorModel } from 'src/app/models/TensorModel';
import { User } from 'src/app/models/User';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';
import { TensorModelDetailComponent } from '../tensor-model-detail/tensor-model-detail.component';

import { TensorModelCreateComponent } from './tensor-model-create.component';

describe('TensorModelCreateComponent', () => {
  let component: TensorModelCreateComponent;
  let fixture: ComponentFixture<TensorModelCreateComponent>;
  let location: Location, router: Router;

  // Service spy's
  let createTensorModelSpy;

  // Mock Data
  const mockAuthtoken = '12345abcde';
  const mockUser = new User('6250306544d75fa812892a72', 'paashaas', '', '', new Date(), [])
  const mockTensorModel = new TensorModel(
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
    mockUser,
    []
  );


  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authtoken', mockAuthtoken);
    localStorage.setItem('_id', mockUser._id);

    const tensorModelService = jasmine.createSpyObj('TensorModelService', ['createTensorModel']);

    createTensorModelSpy = tensorModelService.createTensorModel.and.returnValue(of(mockTensorModel));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: ':username/TensorModels/:tensorModelId', component: TensorModelDetailComponent }
        ]),
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatOptionModule,
        MatInputModule
      ],
      declarations: [TensorModelCreateComponent],
      providers: [
        { provide: TensorModelService, useValue: tensorModelService },
        { provide: LocationStrategy, useValue: MockLocationStrategy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorModelCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate after creating Tensor Model', () => {
    // Create navigate spy
    const navigateSpy = spyOn(router, 'navigate');

    // Set input values in form
    component.tensorModelForm.patchValue({
      name: 'Iris classification',
      description: 'A classic case.',
      category: CategoryEnum.Classification,
      modelType: ModelTypeEnum.CNN,
      configuration: '["Input","Conv2D","Conv2D","DNN","Class output"]',
      epochs: 123,
      accuracy: 0.54,
      loss: 0,
      recall: 0
    });

    // Ensure that the form is valid
    expect(component.tensorModelForm.valid).toBeTrue();

    // Simulate form submit
    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith([`/${mockUser.username}/TensorModels/${mockTensorModel._id}`]);
  });
});
