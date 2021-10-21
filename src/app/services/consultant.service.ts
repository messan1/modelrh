import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8081/api/consultants';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getLimitConsultants(
    nom:string,prenom:string,dispo:string,qualite:string,email:string,postal:string,titre:string,tel:string,client:string,page:number,size:number,datamodif:string,observation:string,tech:string,exp:string,
    ordername:string,
    ordertype:string,trigramme:string
    ): Observable<any> {
      const formdata: FormData = new FormData();
      formdata.append(`name`, nom);
      formdata.append(`prenom`, prenom);
      formdata.append(`dispo`, dispo);
      formdata.append(`qualite`, qualite);
      formdata.append(`email`, email);
      formdata.append(`postal`, postal);
      formdata.append(`titre`, titre);
      formdata.append(`tel`, tel);
      formdata.append(`page`, page.toString());
      formdata.append(`size`, size.toString());
      formdata.append(`exp`, exp);
      formdata.append(`datamodif`, datamodif);
      formdata.append(`client`, client);
      formdata.append(`observation`, observation);
      formdata.append(`tech`, tech);
      formdata.append(`ordername`, ordername);
      formdata.append(`ordertype`, ordertype);
    return this.http.post(endpoint + '/public/get/'+trigramme,formdata);
  }
}


