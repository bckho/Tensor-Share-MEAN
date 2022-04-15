import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentTypeEnum } from 'src/app/models/CommentTypeEnum';
import { User } from 'src/app/models/User';
import { Comment } from 'src/app/models/Comment';

import { CommentUpdateDialogComponent } from './comment-update-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommentService } from 'src/app/services/comments/comment.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('CommentUpdateDialogComponent', () => {
  let component: CommentUpdateDialogComponent;
  let fixture: ComponentFixture<CommentUpdateDialogComponent>;
  let updateCommentSpy;

  const mockUser = new User("101", "user test", "", "", new Date(), []);
  const mockComment = new Comment("123", mockUser, new Date(), "test content", CommentTypeEnum.TensorModel, false, []);

  beforeEach(async () => {
    const commentService = jasmine.createSpyObj('CommentService', ['getComment', 'updateComment']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule, 
        MatDialogModule,
        FormsModule, 
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserDynamicTestingModule
      ],
      declarations: [ CommentUpdateDialogComponent ],
      providers: [
        { provide: CommentService, useValue: commentService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: mockComment }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
