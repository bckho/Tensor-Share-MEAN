import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CommentService } from 'src/app/services/comments/comment.service';

import { TensormodelCommentSectionComponent } from './tensormodel-comment-section.component';

describe('TensormodelCommentSectionComponent', () => {
  let component: TensormodelCommentSectionComponent;
  let fixture: ComponentFixture<TensormodelCommentSectionComponent>;
  let createTensorModelCommentSpy;

  beforeEach(async () => {
    const commentService = jasmine.createSpyObj('CommentService', ['createTensorModelComment']);

    createTensorModelCommentSpy = commentService.createTensorModelComment.and.returnValue(of());

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [TensormodelCommentSectionComponent],
      providers: [
        { provide: CommentService, useValue: commentService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TensormodelCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
