import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TensorModel } from 'src/app/models/TensorModel';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';

@Component({
  selector: 'app-users-tensor-models',
  templateUrl: './users-tensor-models.component.html',
  styleUrls: ['./users-tensor-models.component.css']
})
export class UsersTensorModelsComponent implements OnInit {
  username?: string | null;

  tensorModels?: TensorModel[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private tensorModelService: TensorModelService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.getTensorModels();
  }

  getTensorModels(): void {
    this.tensorModelService.getTensorModelsFromUsername(this.username!).subscribe((results) => {
      this.tensorModels = results;
    },
      () => {
        this._snackbar.open("Something went wrong, try later again!", "OK")
      });
  }
}
