import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Interfaces/GenericResponse';
import { Shipper } from '../Interfaces/shipper';
import { enviroment } from '../Enviroment/enviroment';

const API_CONTROLLER = "/shipper/"
const API_GETEMPLOYEES = "AllShippers";

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  private http = inject(HttpService);

  getShippers() : Observable<GenericResponse<Shipper[]>> {
      return this.http.Get(enviroment.serviceUrlApi + API_CONTROLLER + API_GETEMPLOYEES);   
    }
}
