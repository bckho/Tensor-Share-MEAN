import { Component, OnInit, Input } from '@angular/core';
import { Entity } from 'src/app/models/Entity';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  @Input() entity!: Entity;

  constructor() { }

  ngOnInit(): void {
  }

}
