import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from 'src/app/models/Issue';
import { TensorModel } from 'src/app/models/TensorModel';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {
  @Input() issues?: Issue[];
  @Input() tensorModel?: TensorModel;

  tensorModelId?: string | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tensorModelId = this.route.snapshot.paramMap.get('tensorModelId');
  }
}
