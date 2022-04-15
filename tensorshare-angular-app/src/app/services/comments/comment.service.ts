import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCommentsFromTensorModelURI, getCommentsFromIssueURI, getCommentByIdURI, getUpvoteCommentByIdURI } from '../../util/url-helper';
import { Comment } from '../../models/Comment';
import { CreateTensorModelComment } from '../models/CreateTensorModelCommentModel';
import { CreateIssueComment } from '../models/CreateIssueCommentModel';
import { UpdateComment } from '../models/UpdateCommentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authtoken': localStorage.getItem('authtoken')!
    }),
  };

  constructor(private httpClient: HttpClient) { }

  createTensorModelComment(comment: CreateTensorModelComment): Observable<Comment> {
    return this.httpClient.post<Comment>(
      getCommentsFromTensorModelURI(comment.tensorModelId),
      comment,
      this.httpOptions
    );
  }

  createIssueComment(comment: CreateIssueComment): Observable<Comment> {
    return this.httpClient.post<Comment>(
      getCommentsFromIssueURI(comment.issueId),
      comment,
      this.httpOptions
    );
  }

  getCommentsFromTensorModel(tensorModelId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      getCommentsFromTensorModelURI(tensorModelId),
      this.httpOptions
    );
  }

  getCommentsFromIssue(issueId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      getCommentsFromIssueURI(issueId),
      this.httpOptions
    );
  }

  updateComment(updatedComment: UpdateComment): Observable<Comment> {
    return this.httpClient.put<Comment>(
      getCommentByIdURI(updatedComment.commentId),
      updatedComment,
      this.httpOptions
    );
  }

  deleteComment(issueId: string): Observable<any> {
    return this.httpClient.delete<any>(
      getCommentByIdURI(issueId),
      this.httpOptions
    )
  }

  upvoteComment(commentId: string): Observable<any> {
    return this.httpClient.patch<any>(
      getUpvoteCommentByIdURI(commentId),
      null,
      this.httpOptions
    );
  }
}
