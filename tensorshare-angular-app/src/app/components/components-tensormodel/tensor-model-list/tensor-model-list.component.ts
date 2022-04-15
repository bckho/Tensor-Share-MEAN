import { Component, Input, OnInit } from '@angular/core';
import { TensorModel } from 'src/app/models/TensorModel';

@Component({
  selector: 'app-tensor-model-list',
  templateUrl: './tensor-model-list.component.html',
  styleUrls: ['./tensor-model-list.component.css']
})
export class TensorModelListComponent implements OnInit {
  @Input() tensorModels?: TensorModel[] = []

  constructor() { }

  ngOnInit(): void {
  }

  sliceDescription(description: string): string {
    if (description.length > 100) {
      return description.slice(0, 100) + "...";
    }
    
    return description;
  }
}
