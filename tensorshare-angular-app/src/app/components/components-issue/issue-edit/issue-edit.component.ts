import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from 'src/app/models/Issue';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IssueService } from 'src/app/services/issue/issue.service';
import { UpdateIssue } from 'src/app/services/models/UpdateIssueModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';
import { TensorModel } from 'src/app/models/TensorModel';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  tensorModelId?: string | null;
  issueId?: string | null;

  issue?: Issue;
  tensorModel?: TensorModel;

  issueForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(100000)
    ])
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private tensorModelService: TensorModelService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tensorModelId = this.activatedRoute.snapshot.paramMap.get('tensorModelId');
    this.issueId = this.activatedRoute.snapshot.paramMap.get('issueId');

    this.getTensorModel();
    this.getIssue();
  }

  getIssue(): void {
    if (this.issueId != null) {
      this.issueService.getIssueById(this.issueId).subscribe((result) => {
        this.issue = result;
        this.loadForm();
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

  loadForm(): void {
    this.issueForm = new FormGroup({
      title: new FormControl(this.issue?.title, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl(this.issue?.description, [
        Validators.required,
        Validators.maxLength(100000)
      ])
    })
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      const updatedIssue = new UpdateIssue(
        this.issueId!,
        this.issueForm.get('title')!.value,
        this.issueForm.get('description')!.value
      );

      this.issueService.updateIssue(updatedIssue).subscribe(() => {
        this.router.navigate([`/${this.tensorModel?.user.username}/TensorModels/${this.tensorModelId}/Issues/${this.issueId}`]);
        this._snackbar.open('Successfully updated issue.');
        setTimeout(() => {
          this._snackbar.dismiss();
        }, 3000);
      },
        () => {
          this._snackbar.open('Could not perform action. try again later.', 'OK');
        });
    }
  }
}
