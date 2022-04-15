import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/models/Entity';
import { Requirement } from 'src/app/models/Requirement';
import { EntityService } from 'src/app/services/entity/entity.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  entities!: Entity[];
  requirements!: Requirement[];

  displayedColumns: string[] = ['id', 'description'];

  constructor(private entityService: EntityService) {}

  ngOnInit(): void {
    this.getEntities();
    this.getRequirements();
    console.log(this.requirements);
    
  }

  getEntities(): void {
    this.entityService.getAllEntities().subscribe((e) => (this.entities = e));
  }

  getRequirements(): void {
    this.entityService
      .getAllRequirements()
      .subscribe((r) => (this.requirements = r));
  }
}
