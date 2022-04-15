import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CommentService } from 'src/app/services/comments/comment.service';

import { IssueCommentSectionComponent } from './issue-comment-section.component';

describe('IssueCommentSectionComponent', () => {
  let component: IssueCommentSectionComponent;
  let fixture: ComponentFixture<IssueCommentSectionComponent>;
  let createIssueCommentSpy;

  beforeEach(async () => {
    let commentService = jasmine.createSpyObj('CommentService', ['createIssueComment']);

    createIssueCommentSpy = commentService.createIssueComment.and.returnValue(of());

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [IssueCommentSectionComponent],
      providers: [
        { provider: CommentService, useValue: commentService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
