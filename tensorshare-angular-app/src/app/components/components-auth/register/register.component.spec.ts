import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';

import { UsersTensorModelsComponent } from '../../components-tensormodel/users-tensor-models/users-tensor-models.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { LoginComponent } from '../login/login.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerSpy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    const authService = jasmine.createSpyObj('AuthService', ['register']);

    registerSpy = authService.register.and.returnValue(of())

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule, 
        MatSnackBarModule, 
        RouterTestingModule, 
        HttpClientTestingModule
      ],
      declarations: [RegisterComponent, LoginComponent],
      providers: [MatSnackBar, {provide: AuthService, useValue: authService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
