import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TensorModel } from 'src/app/models/TensorModel';
import { FormErrorStateMatcher } from 'src/app/util/FormErrorStateMatcher';
import { IssueService } from 'src/app/services/issue/issue.service';
import { CreateIssue } from 'src/app/services/models/CreateIssueModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {
  tensorModelId?: string | null;

  tensorModel?: TensorModel;

  issueForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(100000)
    ])
  })

  matcher = new FormErrorStateMatcher();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private tensorModelService: TensorModelService,
    private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.tensorModelId = this.activatedRoute.snapshot.paramMap.get('tensorModelId');
    this.getTensorModel();
  }

  getTensorModel(): void {
    if (this.tensorModelId != null) {
      this.tensorModelService.getTensorModelById(this.tensorModelId).subscribe((result) => {
        this.tensorModel = result;
      },
        () => {
          this.router.navigate([`404`]);
        });
    }
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      const newIssue = new CreateIssue(
        this.issueForm.get('title')?.value,
        this.issueForm.get('description')?.value,
        this.tensorModelId!);

      this.issueService.createIssue(newIssue).subscribe((result) => {
        this.router.navigate([`/${this.tensorModel?.user.username}/TensorModels/${this.tensorModelId}/Issues/${result._id}`]);
        this._snackbar.open("Issue successfully created.");
        setTimeout(() => {
          this._snackbar.dismiss();
        }, 3000);
      },
        () => {
          this._snackbar.open("Could not perform action, try again later.", "OK");
        });

      this.router.navigate([`/${this.tensorModel?.user.username}/TensorModels/${this.tensorModelId}/Issues/`]);
    }
  }
}
