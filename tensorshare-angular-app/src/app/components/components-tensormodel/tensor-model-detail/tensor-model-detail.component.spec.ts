import { Location, LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryEnum } from 'src/app/models/CategoryEnum';
import { Comment } from 'src/app/models/Comment';
import { CommentTypeEnum } from 'src/app/models/CommentTypeEnum';
import { ModelTypeEnum } from 'src/app/models/ModelTypeEnum';
import { TensorModel } from 'src/app/models/TensorModel';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comments/comment.service';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';

import { TensorModelDetailComponent } from './tensor-model-detail.component';

describe('TensorModelDetailComponent', () => {
  let component: TensorModelDetailComponent;
  let fixture: ComponentFixture<TensorModelDetailComponent>;
  let location: Location, router: Router

  // Service Spy's
  let getTensorModelByIdSpy;
  let getCommentsFromTensorModelSpy;
  let upvoteTensorModelSpy;
  let deleteTensorModelSpy;

  // Mock Data
  const mockAuthtoken = '12345abcde';
  const mockUser = new User(
    '6250306544d75fa812892a72',
    'paashaas',
    '',
    '',
    new Date(),
    []
  );

  const mockTensorModel = new TensorModel(
    '102030',
    'test name',
    new Date(),
    new Date(),
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

  const mockComments = [
    new Comment(
      '1',
      mockUser,
      new Date('2022-04-08T10:53:42.018Z'),
      'comment content',
      CommentTypeEnum.TensorModel,
      false,
      []
    ),
  ];

  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('authtoken', mockAuthtoken);
    localStorage.setItem('_id', mockUser._id);

    // Mock Tensor Model Service
    let tensorModelService = jasmine.createSpyObj('TensorModelService', [
      'getTensorModelById', 'upvoteTensorModel', 'deleteTensorModel'
    ]);

    // Mock Comment Service
    let commentService = jasmine.createSpyObj('CommentService', [
      'getCommentsFromTensorModel',
    ]);

    getTensorModelByIdSpy =
      tensorModelService.getTensorModelById.and.returnValue(
        of(mockTensorModel)
      );

    getCommentsFromTensorModelSpy =
      commentService.getCommentsFromTensorModel.and.returnValue(
        of(mockComments)
      );

    upvoteTensorModelSpy =
      tensorModelService.upvoteTensorModel.and.returnValue(of('response'));

    deleteTensorModelSpy = tensorModelService.deleteTensorModel.and.returnValue(
      of('result')
    );

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: ':username/TensorModels',
            component: TensorModelDetailComponent,
          },
        ]),
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatMenuModule
      ],
      declarations: [TensorModelDetailComponent],
      providers: [
        { provide: TensorModelService, useValue: tensorModelService },
        { provide: CommentService, useValue: commentService },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorModelDetailComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get Tensor Models Details', () => {
    component.tensorModelId = mockTensorModel._id;

    component.getTensorModel();
    component.getComments();

    expect(component.tensorModel).toBeTruthy();
  });

  it('Should add new upvote after onVote', () => {
    component.tensorModelId = mockTensorModel._id;
    
    component.getTensorModel();
    component.getComments();

    // Simulate vote
    component.onVote();

    expect(component.tensorModel?.upvotes.length).toBeGreaterThan(0);
    expect(component.tensorModel?.upvotes[0]).toEqual(mockUser._id);
  });

  it('Should remove existing upvote after onVote', () => {
    component.tensorModelId = mockTensorModel._id;

    mockTensorModel.upvotes.push(mockUser._id);

    component.getTensorModel();
    component.getComments();

    // Simulate vote
    component.onVote();

    expect(component.tensorModel?.upvotes.length).toBeLessThanOrEqual(0);
  });

  it('Should be null after deleting Tensor Model', () => {
    component.tensorModelId = mockTensorModel._id;

    // Create navigate spy
    const navigateSpy = spyOn(router, 'navigate');

    component.getTensorModel();
    component.getComments();

    // Simulate delete
    component.onDelete();

    expect(navigateSpy).toHaveBeenCalledWith([
      `/${mockUser.username}/TensorModels`
    ]);
  });
});
