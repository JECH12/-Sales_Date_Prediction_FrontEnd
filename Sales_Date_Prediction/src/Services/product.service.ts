import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Interfaces/GenericResponse';
import { Product } from '../Interfaces/product';
import { enviroment } from '../Enviroment/enviroment';

const API_CONTROLLER = "/product/"
const API_GETEMPLOYEES = "AllProducts";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpService);

  getProducts() : Observable<GenericResponse<Product[]>> {
      return this.http.Get(enviroment.serviceUrlApi + API_CONTROLLER + API_GETEMPLOYEES);   
    }
}
