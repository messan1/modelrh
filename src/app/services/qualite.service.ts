import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8080/qualite/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QualiteService {

  constructor(private http: HttpClient) { }
    private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getRefs(): Observable<any> {
    return this.http.get(endpoint + 'all')
  }


}
