import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../../environments/environment';
import { TypePay } from '../_models/typepay.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TypepayService extends BaseService<TypePay, number>{

  constructor(_httpClient: HttpClient) {
    super(_httpClient, endpoint.typepay);
  }
}
