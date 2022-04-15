import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comments/comment.service';
import { CreateTensorModelComment } from 'src/app/services/models/CreateTensorModelCommentModel';
import { FormErrorStateMatcher } from 'src/app/util/FormErrorStateMatcher';

@Component({
  selector: 'app-tensormodel-comment-section',
  templateUrl: './tensormodel-comment-section.component.html',
  styleUrls: ['./tensormodel-comment-section.component.css']
})
export class TensormodelCommentSectionComponent implements OnInit {
  @Input() tensorModelId?: string
  @Input() comments?: Comment[]

  commentForm = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(100000)
    ])
  });

  matcher = new FormErrorStateMatcher();

  constructor(private _snackbar: MatSnackBar, private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const comment = new CreateTensorModelComment(this.tensorModelId!, this.commentForm.get('content')?.value);

      this.commentService.createTensorModelComment(comment).subscribe((result) => {
        result.user = JSON.parse(localStorage.getItem('user')!)
        this.comments?.push(result);

        // Reset form
        this.commentForm.reset();

        this._snackbar.open("Successfully created new comment!");
      },
        () => {
          this._snackbar.open("Failed to create a new comment, try again!");
        });

      setTimeout(() => {
        this._snackbar.dismiss();
      }, 2000);
    }
  }
}
