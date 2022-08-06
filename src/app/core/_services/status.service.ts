import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../../environments/environment';
import { Status } from '../_models/status.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends BaseService<Status, number>{

  constructor(_httpClient: HttpClient) {
    super(_httpClient, endpoint.status);
  }
}
