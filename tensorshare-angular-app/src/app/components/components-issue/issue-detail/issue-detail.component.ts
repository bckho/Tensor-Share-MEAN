import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from 'src/app/models/Issue';
import { Comment } from 'src/app/models/Comment';
import { TensorModel } from 'src/app/models/TensorModel';
import { IssueService } from 'src/app/services/issue/issue.service';
import { CommentService } from 'src/app/services/comments/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {
  issueId?: string | null;
  tensorModelId?: string | null;

  issue?: Issue;
  comments?: Comment[];
  tensorModel?: TensorModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private commentService: CommentService,
    private tensorModelService: TensorModelService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.issueId = this.activatedRoute.snapshot.paramMap.get('issueId');
    this.tensorModelId = this.activatedRoute.snapshot.paramMap.get('tensorModelId');

    this.getTensorModel();
    this.getIssue();
    this.getComments();
  }

  getIssue(): void {
    if (this.issueId != null) {
      this.issueService.getIssueById(this.issueId).subscribe((result) => {
        this.issue = result;
      },
        () => {
          this.router.navigate(['404']);
        });
    }
  }

  getTensorModel(): void {
    if (this.tensorModelId != null) {
      this.tensorModelService.getTensorModelById(this.tensorModelId).subscribe((result) => {
        this.tensorModel = result;
      },
        () => {
          this.router.navigate(['404']);
        });
    }
  }

  getComments(): void {
    if (this.issueId != null) {
      this.commentService.getCommentsFromIssue(this.issueId).subscribe((results) => {
        this.comments = results;
      },
        () => {
          this._snackbar.open("Could not retrieve comments.");
          setTimeout(() => {
            this._snackbar.dismiss();
          }, 3000);
        });
    }
  }

  isFromCurrentUser(): boolean {
    const userId = localStorage.getItem('_id');
    if (userId != null && this.issue?.user._id === userId) {
      return true;
    }

    return false;
  }

  /**
   * Check if current user is owner of the issue 
   * or owner of the linked Tensor Model
   * @returns boolean
   */
  isOwner(): boolean {
    const userId = localStorage.getItem('_id');

    if (userId === this.issue?.user._id ||
      userId === this.tensorModel?.user._id) {
      return true;
    }

    return false;
  }

  navigateToUpdate(): void {
    this.router.navigate([`/${this.tensorModel?.user.username}/TensorModels/${this.tensorModelId}/Issues/${this.issueId}/Update`])
  }

  onDelete(): void {
    if (confirm("Are you sure you want to delete this issue?")) {
      this.issueService.deleteIssue(this.issueId!).subscribe(() => {
        this.router.navigate([`/${this.tensorModel?.user.username}/TensorModels/${this.tensorModelId}/Issues`])
        this._snackbar.open("Successfully deleted issue.");
        setTimeout(() => {
          this._snackbar.dismiss();
        }, 3000);
      },
        () => {
          this._snackbar.open("Could not perform action, try again later.", "OK");
        });
    }
  }

  onCloseIssue(): void {
    if (confirm("Are you sure you want to set this issue to solved?")) {
      // Add service
      this.issueService.closeIssue(this.issueId!).subscribe(() => {
        this.issue!.isSolved = true;
        const newDate = new Date();
        this.issue!.closedDate = newDate;

        this._snackbar.open("Successfully closed issue.");
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
