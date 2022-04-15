import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from 'src/app/models/Comment';
import { User } from 'src/app/models/User';
import { FormErrorStateMatcher } from 'src/app/util/FormErrorStateMatcher';
import { CommentService } from 'src/app/services/comments/comment.service';
import { CreateIssueComment } from 'src/app/services/models/CreateIssueCommentModel';

@Component({
  selector: 'app-issue-comment-section',
  templateUrl: './issue-comment-section.component.html',
  styleUrls: ['./issue-comment-section.component.css'],
})
export class IssueCommentSectionComponent implements OnInit {
  @Input() issueId?: string;
  @Input() comments?: Comment[];

  commentForm = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(100000),
    ]),
  });

  matcher = new FormErrorStateMatcher();

  constructor(
    private commentService: CommentService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const comment = new CreateIssueComment(
        this.issueId!,
        this.commentForm.get('content')?.value
      );

      this.commentService.createIssueComment(comment).subscribe(
        (result) => {
          result.user = JSON.parse(localStorage.getItem('user')!) as User;
          this.comments?.push(result);

          // Reset form
          this.commentForm.reset();

          this._snackbar.open('Successfully created new comment!');
        },
        () => {
          this._snackbar.open('Failed to create a new comment, try again!');
        }
      );

      setTimeout(() => {
        this._snackbar.dismiss();
      }, 2000);
    }
  }
}
