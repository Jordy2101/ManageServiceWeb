import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../../environments/environment';
import { TypeCurrency } from '../_models/typecurrency.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TypecurrencyService extends BaseService<TypeCurrency, number>{

  constructor(_httpClient: HttpClient) {
    super(_httpClient, endpoint.typecurrency);
  }
}
