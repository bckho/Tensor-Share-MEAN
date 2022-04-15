import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/components-about/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EntityComponent } from './components/components-about/entity/entity.component';
import { TensorModelListComponent } from './components/components-tensormodel/tensor-model-list/tensor-model-list.component';
import { TensorModelDetailComponent } from './components/components-tensormodel/tensor-model-detail/tensor-model-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/components-auth/login/login.component';
import { RegisterComponent } from './components/components-auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersTensorModelsComponent } from './components/components-tensormodel/users-tensor-models/users-tensor-models.component';
import { CommentComponent } from './components/components-comment/comment/comment.component';
import { CommentListComponent } from './components/components-comment/comment-list/comment-list.component';
import { TensorModelCreateComponent } from './components/components-tensormodel/tensor-model-create/tensor-model-create.component';
import { TensorModelUpdateComponent } from './components/components-tensormodel/tensor-model-update/tensor-model-update.component';
import { TensormodelCommentSectionComponent } from './components/components-comment/tensormodel-comment-section/tensormodel-comment-section.component';
import { CommentUpdateDialogComponent } from './components/components-comment/comment-update-dialog/comment-update-dialog.component';
import { TensormodelIssuesComponent } from './components/components-issue/tensormodel-issues/tensormodel-issues.component';
import { IssuesListComponent } from './components/components-issue/issues-list/issues-list.component';
import { IssueCreateComponent } from './components/components-issue/issue-create/issue-create.component';
import { IssueEditComponent } from './components/components-issue/issue-edit/issue-edit.component';
import { IssueDetailComponent } from './components/components-issue/issue-detail/issue-detail.component';
import { IssueCommentSectionComponent } from './components/components-comment/issue-comment-section/issue-comment-section.component';
import { ErrorComponent } from './components/error/error.component';
import { ExploreTensorModelsComponent } from './components/components-tensormodel/explore-tensor-models/explore-tensor-models.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    EntityComponent,
    TensorModelListComponent,
    TensorModelDetailComponent,
    LoginComponent,
    RegisterComponent,
    UsersTensorModelsComponent,
    CommentComponent,
    CommentListComponent,
    TensorModelCreateComponent,
    TensorModelUpdateComponent,
    TensormodelCommentSectionComponent,
    CommentUpdateDialogComponent,
    TensormodelIssuesComponent,
    IssuesListComponent,
    IssueCreateComponent,
    IssueEditComponent,
    IssueDetailComponent,
    IssueCommentSectionComponent,
    ErrorComponent,
    ExploreTensorModelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatListModule,
    ScrollingModule,
    MatDialogModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
