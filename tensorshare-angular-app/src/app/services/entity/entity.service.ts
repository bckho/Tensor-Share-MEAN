import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Entity } from '../../models/Entity';
import entitiesData from '../../../data/entities-data.json';
import requirementsData from '../../../data/requirements-functional.json';
import { Requirement } from 'src/app/models/Requirement';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private entities: Entity[];
  private requirements: Requirement[];

  constructor() {
    this.entities = [];
    this.requirements = [];
    this.loadEntities();
    this.loadRequirements();
  }

  loadEntities() {
    entitiesData.forEach((e) => {
      const u = new Entity(e.name, e.properties);
      this.entities.push(u);
    });
  }

  loadRequirements() {
    requirementsData.forEach((r) => {
      const u = new Requirement(r.id, r.description);
      this.requirements.push(u);
    })
  }

  getAllEntities(): Observable<Entity[]> {
    return of(this.entities);
  }

  getAllRequirements(): Observable<Requirement[]> {
    return of(this.requirements);
  }
}
