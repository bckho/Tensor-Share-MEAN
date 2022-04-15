import { Component, OnInit } from '@angular/core';
import { TensorModel } from 'src/app/models/TensorModel';
import { Issue } from 'src/app/models/Issue';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from 'src/app/services/issue/issue.service';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';

@Component({
  selector: 'app-tensormodel-issues',
  templateUrl: './tensormodel-issues.component.html',
  styleUrls: ['./tensormodel-issues.component.css']
})
export class TensormodelIssuesComponent implements OnInit {
  tensorModelId?: string | null;

  tensorModel?: TensorModel;

  issues?: Issue[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService, 
    private tensorModelService: TensorModelService
    ) { }

  ngOnInit(): void {
    this.tensorModelId = this.route.snapshot.paramMap.get('tensorModelId');
    this.getTensorModel();
    this.getIssues();
  }

  getIssues(): void {
    if (this.tensorModelId != null) {
      this.issueService.getIssuesFromTensorModel(this.tensorModelId).subscribe((results) => {
        this.issues = results;
      },
        (err) => {
          console.log(err);
        })
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
}
