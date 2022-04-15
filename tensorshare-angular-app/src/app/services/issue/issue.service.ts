import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getIssuesFromTensorModelURI, getIssuesURI, getIssueByIdURI, getCloseIssueByIdURI } from '../../util/url-helper';
import { Issue } from '../../models/Issue';
import { CreateIssue } from '../models/CreateIssueModel';
import { UpdateIssue } from '../models/UpdateIssueModel';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authtoken': localStorage.getItem('authtoken')!
    }),
  };

  constructor(private httpClient: HttpClient) { }

  createIssue(issue: CreateIssue): Observable<Issue> {
    return this.httpClient.post<Issue>(
      getIssuesURI(),
      issue,
      this.httpOptions
    );
  }

  getIssuesFromTensorModel(tensorModelId: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(
      getIssuesFromTensorModelURI(tensorModelId),
      this.httpOptions
    );
  }

  getIssueById(_id: string): Observable<Issue> {
    return this.httpClient.get<Issue>(
      getIssueByIdURI(_id),
      this.httpOptions
    );
  }

  updateIssue(updatedIssue: UpdateIssue): Observable<Issue> {
    return this.httpClient.put<Issue>(
      getIssueByIdURI(updatedIssue.issueId),
      updatedIssue,
      this.httpOptions
    );
  }

  deleteIssue(_id: string): Observable<any> {
    return this.httpClient.delete<any>(
      getIssueByIdURI(_id),
      this.httpOptions
    );
  }

  closeIssue(_id: string): Observable<any> {
    return this.httpClient.patch<any>(
      getCloseIssueByIdURI(_id),
      null,
      this.httpOptions
    );
  }
}
