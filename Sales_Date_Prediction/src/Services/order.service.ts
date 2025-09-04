import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { enviroment } from '../Enviroment/enviroment';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Interfaces/GenericResponse';
import { PredictedOrder } from '../Interfaces/PredictedOrder';
import { ClientOrder } from '../Interfaces/ClientOrder';
import { HttpParams } from '@angular/common/http';
import { NewOrder } from '../Interfaces/newOrder';

const API_CONTROLLER = "/order/"
const API_GETPREDICTEDORDERS = "next-orders";
const API_GETCLIENTORDERS = "/orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpService);

  getPredictedOrders(companyName: string | null): Observable<GenericResponse<PredictedOrder[]>> {
  let params = new HttpParams();
  
  if (companyName) {
    params = params.set('companyName', companyName);
  }

  return this.http.Get<GenericResponse<PredictedOrder[]>>(
    enviroment.serviceUrlApi + API_CONTROLLER + API_GETPREDICTEDORDERS,
    params
  );
}

  getClientOrders(customerId: number) :Observable<GenericResponse<ClientOrder[]>> {
    return this.http.Get( enviroment.serviceUrlApi + API_CONTROLLER + customerId + API_GETCLIENTORDERS);
  }

  createOrder(newOrder: NewOrder):Observable<GenericResponse<number[]>> {
    console.log(newOrder);
    return this.http.Post(enviroment.serviceUrlApi + API_CONTROLLER , newOrder);
  }
}
