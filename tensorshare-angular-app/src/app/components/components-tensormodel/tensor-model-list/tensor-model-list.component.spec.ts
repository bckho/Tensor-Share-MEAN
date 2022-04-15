import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TensorModel } from 'src/app/models/TensorModel';
import { User } from 'src/app/models/User';

import { TensorModelListComponent } from './tensor-model-list.component';

describe('TensorModelListComponent', () => {
  let component: TensorModelListComponent;
  let fixture: ComponentFixture<TensorModelListComponent>;

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
    await TestBed.configureTestingModule({
      declarations: [ TensorModelListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('List should contain 2 Tensor Models', () => {
    component.tensorModels = mockTensorModels;

    expect(component.tensorModels.length).toEqual(2);
  });
});
