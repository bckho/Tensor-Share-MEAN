import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryEnum } from 'src/app/models/CategoryEnum';
import { ModelTypeEnum } from 'src/app/models/ModelTypeEnum';
import { CreateTensorModelModel } from 'src/app/services/models/CreateTensorModelModel';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';
import { FormErrorStateMatcher } from 'src/app/util/FormErrorStateMatcher';

@Component({
  selector: 'app-tensor-model-create',
  templateUrl: './tensor-model-create.component.html',
  styleUrls: ['./tensor-model-create.component.css']
})
export class TensorModelCreateComponent implements OnInit {
  categories: string[] = [];
  modelTypes: string[] = [];
  currentUsername?: string = JSON.parse(localStorage.getItem('user')!).username;

  constructor(private router: Router, private tensorModelService: TensorModelService, private _snackbar: MatSnackBar) { }

  matcher = new FormErrorStateMatcher();

  tensorModelForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^.{1,50}$')
    ]),
    description: new FormControl('', [
      Validators.maxLength(100000)
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    modelType: new FormControl('', [
      Validators.required
    ]),
    configuration: new FormControl('', [
      Validators.required,
      Validators.pattern('^(\\[\\"[[a-zA-Z0-9-_|#/ ]{1,1000}\\"])|(\\[\\"[a-zA-Z0-9,-_|#/ ]{1,1000}\\"(\\,\\"[a-zA-Z0-9,-_|#/ ]{1,1000}\\")+])$')
    ]),
    epochs: new FormControl('', [
      Validators.min(0),
      Validators.max(99999999999)
    ]),
    accuracy: new FormControl('', [
      Validators.min(-100),
      Validators.max(100)
    ]),
    loss: new FormControl('', [
      Validators.min(-100),
      Validators.max(100)
    ]),
    recall: new FormControl('', [
      Validators.min(-100),
      Validators.max(100)
    ])
  });

  loadCategories(): void {
    for (var cat in CategoryEnum) {
      if (isNaN(Number(cat))) {
        this.categories.push(cat);
      }
    }
  }

  loadModelTypes(): void {
    for (var cat in ModelTypeEnum) {
      if (isNaN(Number(cat))) {
        this.modelTypes.push(cat);
      }
    }
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadModelTypes();
  }

  onSubmit(): void {
    if (this.tensorModelForm.valid) {

      const f = this.tensorModelForm;

      const name = f.get('name')?.value;
      const description = f.get('description')?.value;
      const category = f.get('category')?.value;
      const modelType = f.get('modelType')?.value;
      const configuration = JSON.parse(f.get('configuration')?.value);
      const epochs = f.get('epochs')?.value;
      const accuracy = f.get('accuracy')?.value;
      const loss = f.get('loss')?.value;
      const recall = f.get('recall')?.value;

      const newModel = new CreateTensorModelModel(
        name,
        description,
        category,
        modelType,
        configuration,
        epochs,
        accuracy,
        loss,
        recall
      );

      this.tensorModelService.createTensorModel(newModel).subscribe((result) => {
        const { _id } = result;

        this._snackbar.open("Successfully created Tensor Model!")

        this.router.navigate([`/${this.currentUsername}/TensorModels/${_id}`]);

        // Timeout for snackbar dismiss
        setTimeout(() => {
          this._snackbar.dismiss();
        }, 2000);
        
      }, () => {
        this._snackbar.open("Failed to create Tensor Model!", "OK")
      });
    }
  }
}
