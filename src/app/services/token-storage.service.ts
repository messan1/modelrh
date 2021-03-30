import { Injectable } from '@angular/core';
import { Observable ,BehaviorSubject} from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  private readonly _signature = new BehaviorSubject<String>("");
  readonly signature$ = this._signature.asObservable()

  
  setsignature(state:String){
    let str = `${Date.now() +Math.floor(Math.random() * 199999999)}`+state
    this._signature.next(str);
  }
  getsignature():String{
    return this._signature.getValue();
  }

  signOut() {
    localStorage.clear()
  }
  generateSignature(){
    return Date.now() +Math.floor(Math.random() * 199999999)
  }

  public saveToken(token: string) {
  
    localStorage.removeItem(TOKEN_KEY)
 
    localStorage.setItem(TOKEN_KEY,token)
  }

  public getToken(): string | null{
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user:any) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    let userkey = localStorage.getItem(USER_KEY);
    if(userkey){
      return JSON.parse(userkey);

    }
  }
}