import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comments/comment.service';
import { UpdateComment } from 'src/app/services/models/UpdateCommentModel';
import { FormErrorStateMatcher } from 'src/app/util/FormErrorStateMatcher';

@Component({
  selector: 'app-comment-update-dialog',
  templateUrl: './comment-update-dialog.component.html',
  styleUrls: ['./comment-update-dialog.component.css'],
})
export class CommentUpdateDialogComponent implements OnInit {
  constructor(
    public updateDialogRef: MatDialogRef<CommentUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comment,
    private commentService: CommentService,
    private _snackbar: MatSnackBar
  ) { }

  updateForm = new FormGroup({
    content: new FormControl(this.data.content, [Validators.required, Validators.maxLength(100000)]),
  });

  matcher = new FormErrorStateMatcher();

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const newContent = this.updateForm.get('content')?.value as string;
      const { _id } = this.data;
      const updatedComment = new UpdateComment(_id, newContent)

      this.commentService.updateComment(updatedComment).subscribe(() => {
        this.data.content = newContent;

        this._snackbar.open("Comment successfully updated.");
        setTimeout(() => {
          this._snackbar.dismiss();
        }, 3000);
      },
        () => {
          this._snackbar.open("Could not perform action, please try again later.", "OK");
        });

      this.updateDialogRef.close();
    }
  }

  onNoClick(): void {
    this.updateDialogRef.close();
  }
}
