import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Entity } from 'src/app/models/Entity';
import { Requirement } from 'src/app/models/Requirement';
import { EntityService } from 'src/app/services/entity/entity.service';
import { EntityComponent } from '../entity/entity.component';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let getAllEntitiesSpy;
  let getAllRequirementsSpy;

  const mockEntities = [new Entity("test name", ["prop 1"])];
  const mockRequirements = [new Requirement("1", "testing")];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    const entityService = jasmine.createSpyObj('EntityService', ['getAllEntities', 'getAllRequirements']);

    getAllEntitiesSpy = entityService.getAllEntities.and.returnValue(of(mockEntities));

    getAllRequirementsSpy = entityService.getAllRequirements.and.returnValue(of(mockRequirements));

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [EntityComponent],
      providers: [{provide: EntityService, useValue: entityService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
