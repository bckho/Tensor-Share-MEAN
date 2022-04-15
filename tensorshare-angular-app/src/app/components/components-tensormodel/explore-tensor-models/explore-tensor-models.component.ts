import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TensorModel } from 'src/app/models/TensorModel';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';

@Component({
  selector: 'app-explore-tensor-models',
  templateUrl: './explore-tensor-models.component.html',
  styleUrls: ['./explore-tensor-models.component.css']
})
export class ExploreTensorModelsComponent implements OnInit {
  currentUsername?: String;

  tensorModels?: TensorModel[];

  constructor(
    private tensorModelService: TensorModelService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.currentUsername = JSON.parse(localStorage.getItem("user")!).username;
    this.getTensorModels();
  }

  getTensorModels(): void {
    this.tensorModelService.getTensorModels().subscribe((results) => {
      this.tensorModels = results;
    },
      () => {
        this._snackbar.open("Something went wrong, try later again!", "OK")
      });
  }
}
