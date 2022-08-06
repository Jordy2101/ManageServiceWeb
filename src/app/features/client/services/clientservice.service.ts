import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint, key } from '../../../../environments/environment';
import { BaseService } from '../../../core/_services/base.service';
import { Client } from '../models/clientmodel.model';
import { CreateClient } from '../models/createclient.model';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceService extends BaseService<Client, number>{

  
  headers = new HttpHeaders()
  .set(key.nameKey, key.key);

  
  constructor(_httpClient: HttpClient) {
    super(_httpClient, endpoint.client);
  }

  getPaged(page: number, filter: any) {
    return this._httpClient.get<any>(endpoint.client + `/GetPaged?keyword=${filter.keyword}&PageNumber=${page}&pageSize=${filter.pageSize}`, { responseType: "json", headers: this.headers });
   }

   createClient(data: CreateClient){
    return this._httpClient.post(endpoint.client + `/CreateClient`, data, { responseType: "json", headers: this.headers });
   }

}
