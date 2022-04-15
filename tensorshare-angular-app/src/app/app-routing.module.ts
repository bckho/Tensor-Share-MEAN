import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/components-about/about/about.component';
import { LoginComponent } from './components/components-auth/login/login.component';
import { RegisterComponent } from './components/components-auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TensorModelDetailComponent } from './components/components-tensormodel/tensor-model-detail/tensor-model-detail.component';
import { UsersTensorModelsComponent } from './components/components-tensormodel/users-tensor-models/users-tensor-models.component';
import { TensorModelCreateComponent } from './components/components-tensormodel/tensor-model-create/tensor-model-create.component';
import { TensorModelUpdateComponent } from './components/components-tensormodel/tensor-model-update/tensor-model-update.component';
import { TensormodelIssuesComponent } from './components/components-issue/tensormodel-issues/tensormodel-issues.component';
import { IssueCreateComponent } from './components/components-issue/issue-create/issue-create.component';
import { IssueDetailComponent } from './components/components-issue/issue-detail/issue-detail.component';
import { IssueEditComponent } from './components/components-issue/issue-edit/issue-edit.component';
import { ErrorComponent } from './components/error/error.component';
import { ExploreTensorModelsComponent } from './components/components-tensormodel/explore-tensor-models/explore-tensor-models.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'About', component: AboutComponent },
  { path: 'Login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'Register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: ':username/TensorModels', component: UsersTensorModelsComponent, canActivate: [AuthGuard]},
  { path: 'Explore', component: ExploreTensorModelsComponent, canActivate: [AuthGuard] },
  { path: 'TensorModels/Create', component: TensorModelCreateComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: ':username/TensorModels/:tensorModelId/Update', component: TensorModelUpdateComponent, canActivate: [AuthGuard] },
  { path: ':username/TensorModels/:tensorModelId', component: TensorModelDetailComponent, canActivate: [AuthGuard] },
  { path: ':username/TensorModels/:tensorModelId/Issues', component: TensormodelIssuesComponent, canActivate: [AuthGuard] },
  { path: ':username/TensorModels/:tensorModelId/Issues/Create', component: IssueCreateComponent, canActivate: [AuthGuard] },
  { path: ':username/TensorModels/:tensorModelId/Issues/:issueId', component: IssueDetailComponent, canActivate: [AuthGuard] },
  { path: ':username/TensorModels/:tensorModelId/Issues/:issueId/Update', component: IssueEditComponent, canActivate: [AuthGuard] },
  { path: '404', component: ErrorComponent },

  // Wildcard route for invalid/404 request
  { path: '**', pathMatch: 'full', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
