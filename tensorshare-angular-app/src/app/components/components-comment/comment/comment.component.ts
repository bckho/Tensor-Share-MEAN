import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comments/comment.service';
import { CommentUpdateDialogComponent } from '../comment-update-dialog/comment-update-dialog.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment?: Comment;

  constructor(public dialog: MatDialog, private commentService: CommentService, private _snackbar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  getEditedTag(): string {
    if (this.comment?.isEdited) {
      return "(Edited)";
    }

    return "";
  }

  openUpdateDialog(): void {
    this.dialog.open(CommentUpdateDialogComponent, {
      width: '250px',
      data: this.comment
    });
  }

  isFromCurrentUser(): boolean {
    const userId = localStorage.getItem('_id');
    if (userId != null && this.comment?.user._id === userId) {
      return true;
    }

    return false;
  }

  hasUpvoted(): boolean {
    const userId = localStorage.getItem('_id');

    if (userId != null && this.comment?.upvotes.indexOf(userId)! > -1) return true;

    return false;
  }

  onVote(): void {
    const userId = localStorage.getItem('_id');

    if (userId != null) {
      this.commentService.upvoteComment(this.comment!._id).subscribe(() => {
        if (this.comment?.upvotes.includes(userId)) {
          this.comment.upvotes = this.comment.upvotes.filter(x => x !== userId);
        } else {
          this.comment?.upvotes.push(userId);
        }
      },
        () => {
          this._snackbar.open("Could not vote on comment, try again!");

          setTimeout(() => {
            this._snackbar.dismiss();
          }, 3000);
        });
    }
  }

  onDelete(): void {
    if (confirm("Are you sure you want to delete this comment!")) {
      this.commentService.deleteComment(this.comment!._id).subscribe(() => {
        this.comment = undefined;
        this._snackbar.open("Successfully deleted comment.");
        setTimeout(() => {
          this._snackbar.dismiss();
        }, 3000);
      },
        () => {
          this._snackbar.open("Could not perform action, try again later.", "OK");
        });
    }
  }
}