import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryEnum } from 'src/app/models/CategoryEnum';
import { ModelTypeEnum } from 'src/app/models/ModelTypeEnum';
import { TensorModel } from 'src/app/models/TensorModel';
import { FormErrorStateMatcher } from 'src/app/util/FormErrorStateMatcher';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateTensorModelModel } from 'src/app/services/models/UpdateTensorModelModel';

@Component({
  selector: 'app-tensor-model-update',
  templateUrl: './tensor-model-update.component.html',
  styleUrls: ['./tensor-model-update.component.css'],
})
export class TensorModelUpdateComponent implements OnInit {
  tensorModelId?: string | null;

  categories: string[] = [];
  modelTypes: string[] = [];

  tensorModel?: TensorModel;

  matcher = new FormErrorStateMatcher();

  tensorModelForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^.{1,50}$'),
    ]),
    description: new FormControl('', [Validators.maxLength(100000)]),
    category: new FormControl('', [Validators.required]),
    modelType: new FormControl('', [Validators.required]),
    configuration: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^\\[("([a-zA-Z0-9,-_|#/ ]{1,1000})"(,"[a-zA-Z0-9,-_|#/ ]{1,1000}")+)\\]$'
      ),
    ]),
    epochs: new FormControl('', [Validators.min(0), Validators.max(99999999)]),
    accuracy: new FormControl('', [Validators.min(-100), Validators.max(100)]),
    loss: new FormControl('', [Validators.min(-100), Validators.max(100)]),
    recall: new FormControl('', [Validators.min(-100), Validators.max(100)]),
  });

  constructor(
    private router: Router,
    private tensorModelService: TensorModelService,
    private _snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tensorModelId =
      this.activatedRoute.snapshot.paramMap.get('tensorModelId');
    this.getTensorModel();
    this.loadCategories();
    this.loadModelTypes();
  }

  loadForm(): void {
    if (this.tensorModel != undefined && this.tensorModel != null) {
      this.tensorModelForm = new FormGroup({
        name: new FormControl(this.tensorModel!.name, [
          Validators.required,
          Validators.pattern('^.{1,50}$'),
        ]),
        description: new FormControl(this.tensorModel!.description, [
          Validators.maxLength(100000),
        ]),
        category: new FormControl(this.tensorModel!.category, [
          Validators.required,
        ]),
        modelType: new FormControl(this.tensorModel!.modelType, [
          Validators.required,
        ]),
        configuration: new FormControl(
          JSON.stringify(this.tensorModel!.configuration),
          [
            Validators.required,
            Validators.pattern(
              '^(\\[\\"[[a-zA-Z0-9-_|#/ ]{1,1000}\\"])|(\\[\\"[a-zA-Z0-9,-_|#/ ]{1,1000}\\"(\\,\\"[a-zA-Z0-9,-_|#/ ]{1,1000}\\")+])$'
            ),
          ]
        ),
        epochs: new FormControl(this.tensorModel!.epochs, [
          Validators.min(0),
          Validators.max(99999999),
        ]),
        accuracy: new FormControl(this.tensorModel!.accuracy, [
          Validators.min(-100),
          Validators.max(100),
        ]),
        loss: new FormControl(this.tensorModel!.loss, [
          Validators.min(-100),
          Validators.max(100),
        ]),
        recall: new FormControl(this.tensorModel!.recall, [
          Validators.min(-100),
          Validators.max(100),
        ]),
      });
    }
  }

  getTensorModel(): void {
    if (this.tensorModelId != null && this.tensorModelId != undefined) {
      this.tensorModelService.getTensorModelById(this.tensorModelId).subscribe(
        (result) => {
          if (result != null) {
            this.tensorModel = result;
            this.loadForm();
          }
        },
        () => {
          this.router.navigate(['404']);
        }
      );
    }
  }

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

  onSubmit(): void {
    if (this.tensorModelForm!.valid) {
      const f = this.tensorModelForm!;

      const name = f.get('name')?.value;
      const description = f.get('description')?.value;
      const category = f.get('category')?.value;
      const modelType = f.get('modelType')?.value;
      const configuration = JSON.parse(f.get('configuration')?.value);
      const epochs = f.get('epochs')?.value;
      const accuracy = f.get('accuracy')?.value;
      const loss = f.get('loss')?.value;
      const recall = f.get('recall')?.value;

      const updatedModel = new UpdateTensorModelModel(
        this.tensorModelId!,
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

      this.tensorModelService.updateTensorModel(updatedModel).subscribe(
        () => {
          this._snackbar.open('Tensor Model successfully updated.');
          this.router.navigate([
            `${this.tensorModel?.user.username}/TensorModels/${this.tensorModelId}`,
          ]);
          setTimeout(() => {
            this._snackbar.dismiss();
          }, 3000);
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
}
