import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Comment } from 'src/app/models/Comment';
import { CommentTypeEnum } from 'src/app/models/CommentTypeEnum';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comments/comment.service';
import { CommentUpdateDialogComponent } from '../comment-update-dialog/comment-update-dialog.component';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let getCommentSpy;

  const mockUser = new User("101", "user test", "", "", new Date(), []);
  const mockComment = new Comment("123", mockUser, new Date(), "test content", CommentTypeEnum.TensorModel, false, []);

  beforeEach(async () => {
    const commentService = jasmine.createSpyObj('CommentService', ['getComment']);

    getCommentSpy = commentService.getComment.and.returnValue(of(mockComment));

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, HttpClientTestingModule],
      declarations: [CommentComponent, CommentUpdateDialogComponent],
      providers: [{ provide: CommentService, useValue: commentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
