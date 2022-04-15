import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryEnum } from 'src/app/models/CategoryEnum';
import { Comment } from 'src/app/models/Comment';
import { ModelTypeEnum } from 'src/app/models/ModelTypeEnum';
import { TensorModel } from 'src/app/models/TensorModel';
import { CommentService } from 'src/app/services/comments/comment.service';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';

@Component({
  selector: 'app-tensor-model-detail',
  templateUrl: './tensor-model-detail.component.html',
  styleUrls: ['./tensor-model-detail.component.css'],
})
export class TensorModelDetailComponent implements OnInit {
  tensorModelId?: string | null;

  tensorModel?: TensorModel;
  comments?: Comment[];

  updateForm = new FormGroup({
    name: new FormControl(this.tensorModel?.name, []),
    description: new FormControl(this.tensorModel?.description, []),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tensorModelService: TensorModelService,
    private commentService: CommentService,
    private _snackbar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.tensorModelId = await this.activatedRoute.snapshot.paramMap.get(
      'tensorModelId'
    );
    await this.getTensorModel();
    await this.getComments();
  }

  // Service method
  async getTensorModel(): Promise<void> {
    this.tensorModelService.getTensorModelById(this.tensorModelId!).subscribe(
      (result) => {
        this.tensorModel = result;
      },
      () => {
        this.router.navigate(['404']);
        this._snackbar.open('Tensor Model not found!');
        setTimeout(() => {
          this._snackbar.dismiss();
        }, 3000);
      }
    );
  }

  // Check if Tensor Model is from current logged in user
  isFromCurrentUser(): boolean {
    const userId = localStorage.getItem('_id');
    if (userId != null && this.tensorModel?.user._id === userId) {
      return true;
    }

    return false;
  }

  async getComments(): Promise<void> {
    this.commentService
      .getCommentsFromTensorModel(this.tensorModelId!)
      .subscribe(
        (results) => {
          this.comments = results;
        },
        () => {
          this._snackbar.open('Unable to retrieve comments!');
          setTimeout(() => {
            this._snackbar.dismiss();
          }, 3000);
        }
      );
  }

  // Getter
  getCategoryTypeValue(cat: CategoryEnum): string {
    if (cat in CategoryEnum) {
      return CategoryEnum[cat].toString();
    }
    return '';
  }

  // Getter
  getModelTypeValue(mType: ModelTypeEnum): string {
    if (mType in ModelTypeEnum) {
      return ModelTypeEnum[mType];
    }
    return '';
  }

  // Check if current user has already upvoted the Tensor Model
  hasUpvoted(): boolean {
    const userId = localStorage.getItem('_id');

    if (userId != null && this.tensorModel?.upvotes.indexOf(userId)! > -1)
      return true;

    return false;
  }

  // Add or remove upvote
  onVote(): void {
    const id = localStorage.getItem('_id');
    if (id != null && this.tensorModelId != null) {
      this.tensorModelService.upvoteTensorModel(this.tensorModelId!).subscribe(
        () => {
          if (this.tensorModel?.upvotes.includes(id)) {
            this.tensorModel.upvotes = this.tensorModel.upvotes.filter(
              (x) => x !== id
            );
          } else {
            this.tensorModel?.upvotes.push(id);
          }
        },
        () => {
          this._snackbar.open(
            'Could not perform action, try again later.',
            'OK'
          );
        }
      );
    }
  }

  navigateToUpdate(): void {
    this.router.navigate([
      `/${this.tensorModel?.user.username}/TensorModels/${this.tensorModelId}/Update`,
    ]);
  }

  onDelete(): void {
    this.tensorModelService.deleteTensorModel(this.tensorModelId!).subscribe(
      () => {
        this._snackbar.open('Successfully deleted Tensor Model.');
        this.router.navigate([
          `/${this.tensorModel?.user.username}/TensorModels`,
        ]);
        setTimeout(() => {
          this._snackbar.dismiss();
        }, 3000);
      },
      () => {
        this._snackbar.open('Could not perform action, try again later.', 'OK');
      }
    );
  }

  onRequestDelete(): void {
    if (
      confirm(
        `Are you sure you want to delete this Tensor Model: '${this.tensorModel?.name}'?`
      ) &&
      localStorage.getItem('_id') === this.tensorModel?.user._id
    ) {
      this.onDelete();
    }
  }
}
