import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Interfaces/GenericResponse';
import { enviroment } from '../Enviroment/enviroment';
import { Employee } from '../Interfaces/employee';

const API_CONTROLLER = "/employee/"
const API_GETEMPLOYEES = "AllEmployees";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpService);

  getEmployees() : Observable<GenericResponse<Employee[]>> {
      return this.http.Get(enviroment.serviceUrlApi + API_CONTROLLER + API_GETEMPLOYEES);   
    }
}
