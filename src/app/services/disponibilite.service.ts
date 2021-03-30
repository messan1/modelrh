import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://apprh.itns-tn.com:8080/disponibilite';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getRefs(): Observable<any> {
    return this.http.get(endpoint + '/public/all')
  }
  calculate(): Observable<any> {
    return this.http.get(endpoint + '/calculate')
  }

  addDispo(libelle:string): Observable<any> {
    return this.http.post<any>(endpoint + '/admin/add', libelle, httpOptions);
  }
  checkordre(ordre:Number): Observable<any> {
    return this.http.post<any>(endpoint + '/admin/checkordre', ordre, httpOptions);
  }
  delDispo(libelle: String): Observable<any> {
    return this.http.delete<any>(endpoint + `/admin/delete/${libelle}`, httpOptions);
  }

  updateDispo(id:String,libelle: String): Observable<any> {
    return this.http.put<any>(endpoint + `/admin/update/${id}`, libelle, httpOptions);
  }

  findByLibelle(libelle: String): Observable<any> {
    return this.http.get(endpoint + `/admin/find/${libelle}`, httpOptions);
  }
  updateDispos(dispo:any, id:string,libelle:any) {
    let params = new HttpParams();
    params = params.append('id', id);
	 params = params.append('libelle', libelle);
    return this.http.put<any>(endpoint + '/admin/updated', dispo, {params});
  }
}
