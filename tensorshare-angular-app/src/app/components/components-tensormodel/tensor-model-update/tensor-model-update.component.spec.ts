import { Location, LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { TensorModelUpdateComponent } from './tensor-model-update.component';

describe('TensorModelUpdateComponent', () => {
  let component: TensorModelUpdateComponent;
  let fixture: ComponentFixture<TensorModelUpdateComponent>;
  let location: Location, router: Router;

  // Service spy's
  let getTensorModelByIdSpy;
  let updateTensorModelSpy;

  // Mock data
  const mockAuthtoken = '12345abcde';
  const mockUser = new User('312421', 'henk02', '', '', new Date(), []);
  const mockTensorModel = new TensorModel(
    '102030',
    'test name',
    new Date('2022-04-04'),
    new Date('2022-04-04'),
    'test description',
    CategoryEnum.Classification,
    ModelTypeEnum.CNN,
    ['layer 1'],
    0.1,
    0.2,
    0.3,
    0.4,
    mockUser,
    []
  );

  const mockUpdatedTensorModel = new TensorModel(
    '102030',
    'test name update',
    new Date('2022-04-04'),
    new Date('2022-05-23'),
    'test description updated',
    CategoryEnum.Classification,
    ModelTypeEnum.CNN,
    ['layer 1'],
    0.1,
    0.2,
    0.3,
    0.4,
    mockUser,
    []
  );

  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authtoken', mockAuthtoken);
    localStorage.setItem('_id', mockUser._id);

    const tensorModelService = jasmine.createSpyObj('TensorModelService', [
      'getTensorModelById',
      'updateTensorModel',
    ]);

    getTensorModelByIdSpy =
      tensorModelService.getTensorModelById.and.returnValue(
        of(mockTensorModel)
      );

    updateTensorModelSpy = tensorModelService.updateTensorModel.and.returnValue(
      of(mockUpdatedTensorModel)
    );

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: ':username/TensorModels/:tensorModelId',
            component: TensorModelDetailComponent,
          },
        ]),
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatOptionModule,
        MatInputModule,
      ],
      declarations: [TensorModelUpdateComponent],
      providers: [
        { provide: TensorModelService, useValue: tensorModelService },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorModelUpdateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    component.tensorModel = mockTensorModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate after updating Tensor Model', () => {
    component.tensorModelId = mockTensorModel._id;

    // Create navigate spy
    const navigateSpy = spyOn(router, 'navigate');

    component.getTensorModel();

    const updatedName = 'test name update';
    const updatedDescription = 'test description updated';

    // Set updated values as input for form
    component.tensorModelForm.patchValue({
      name: updatedName,
      description: updatedDescription,
    });

    // Ensure that the form is valid
    expect(component.tensorModelForm.valid).toBeTrue();

    // Simulate form submit
    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith([
      `${mockUser.username}/TensorModels/${mockTensorModel._id}`
    ]);
  });
});
