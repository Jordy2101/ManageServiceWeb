import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint, key } from '../../../../environments/environment';
import { BaseService } from '../../../core/_services/base.service';
import { Service } from '../models/manageservice.model';

@Injectable({
  providedIn: 'root'
})
export class ManageservicesService extends BaseService<Service, number>{

  headers = new HttpHeaders()
  .set(key.nameKey, key.key);


  constructor(_httpClient: HttpClient) {
    super(_httpClient, endpoint.service);
  }

  getPaged(page: number, filter: any) {
    return this._httpClient.get<any>(endpoint.service + `/GetPaged?keyword=${filter.keyword}&PageNumber=${page}&pageSize=${filter.pageSize}`, { responseType: "json", headers: this.headers });
   }

   getTypeService(){
    return this._httpClient.get<any>(endpoint.typeService, { responseType: "json", headers: this.headers });
   }

   getStatus(){
    return this._httpClient.get<any>(endpoint.status, { responseType: "json", headers: this.headers });
   }

   getAdress(idClient: any){
    return this._httpClient.get<any>(endpoint.clientAdress + `/GetClientAdressAsync/${idClient}`, { responseType: "json", headers: this.headers });
   }

   createService(data: Service){
    return this._httpClient.post(endpoint.service+ `/CreateService` , data, { responseType: "json", headers: this.headers });
   }
}
