import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public Post<T>(URL: string, parameters: any): Observable<T>{
    let body = JSON.stringify(parameters);
    return this.http.post<T>(URL,body, {
      headers: this.getHeaders()
    });  
  }

  public Get<T>(URL: string, params?: HttpParams): Observable<T> {
  return this.http.get<T>(URL, {
    headers: this.getHeaders(),
    params
  });
}
}
