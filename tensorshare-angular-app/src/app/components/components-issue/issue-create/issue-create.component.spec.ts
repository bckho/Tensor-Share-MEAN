import { LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { IssueService } from 'src/app/services/issue/issue.service';
import { TensorModelService } from 'src/app/services/tensormodel/tensor-model.service';

import { IssueCreateComponent } from './issue-create.component';

describe('IssueCreateComponent', () => {
  let component: IssueCreateComponent;
  let fixture: ComponentFixture<IssueCreateComponent>;
  let getTensorModelByIdSpy;
  let createIssueSpy;

  beforeEach(async () => {
    const tensorModelService = jasmine.createSpyObj('TensorModelService', ['getTensorModelById']);
    const issueService = jasmine.createSpyObj('IssueService', ['createIssue']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ IssueCreateComponent ],
      providers: [
        { provide: TensorModelService, useValue: tensorModelService },
        { provide: IssueService, useValue: issueService },
        { provide: LocationStrategy, useValue: MockLocationStrategy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
