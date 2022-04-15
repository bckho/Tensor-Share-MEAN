import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getTensorModelsURI, getTensorModelsFromUserURI, getTensorModelByIdURI, getUpvoteTensorModelByIdURI } from '../../util/url-helper';
import { Router } from '@angular/router';
import { TensorModel } from 'src/app/models/TensorModel';
import { CreateTensorModelModel } from '../models/CreateTensorModelModel';
import { UpdateTensorModelModel } from '../models/UpdateTensorModelModel';

@Injectable({
  providedIn: 'root'
})
export class TensorModelService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authtoken': localStorage.getItem('authtoken')!
    }),
  };

  constructor(private httpClient: HttpClient) { }

  createTensorModel(tensorModel: CreateTensorModelModel): Observable<TensorModel> {
    return this.httpClient.post<TensorModel>(
      getTensorModelsURI(),
      tensorModel,
      this.httpOptions
    );
  }

  getTensorModels(): Observable<TensorModel[]> {
    return this.httpClient.get<TensorModel[]>(getTensorModelsURI(), this.httpOptions);
  }

  getTensorModelsFromUsername(username: string): Observable<TensorModel[]> {
    return this.httpClient.get<TensorModel[]>(
      getTensorModelsFromUserURI(username),
      this.httpOptions
    );
  }

  getTensorModelById(_id: string): Observable<TensorModel> {
    return this.httpClient.get<TensorModel>(
      getTensorModelByIdURI(_id),
      this.httpOptions
    );
  }

  updateTensorModel(updateTensorModel: UpdateTensorModelModel): Observable<TensorModel> {
    return this.httpClient.put<TensorModel>(
      getTensorModelByIdURI(updateTensorModel.tensorModelId),
      updateTensorModel,
      this.httpOptions
    );
  }

  deleteTensorModel(tensorModelId: string): Observable<any> {
    return this.httpClient.delete<any>(
      getTensorModelByIdURI(tensorModelId),
      this.httpOptions
    );
  }

  upvoteTensorModel(_id: string): Observable<any> {
    return this.httpClient.patch<any>(
      getUpvoteTensorModelByIdURI(_id),
      null,
      this.httpOptions
    );
  }
}
