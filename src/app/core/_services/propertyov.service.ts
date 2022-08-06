import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../../environments/environment';
import { PropertyOV } from '../_models/propertyov.models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyovService extends BaseService<PropertyOV, number>{

  constructor(_httpClient: HttpClient) {
    super(_httpClient, endpoint.propertyov);
  }
}
