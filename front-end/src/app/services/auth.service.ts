import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl:string=`http://127.0.0.1:8000/api/users`;
  private apiUrl2:string=`http://127.0.0.1:8000/api/auth/`;
  tokenKey : string = "code_info_token";
  userKey : string = "code_info_user";
  constructor( private http:HttpClient, private router:Router) { }

  register(user: any):Observable<any>{

    console.log("register");
    console.log(user);
    console.log("user");
    return this.http.post<any>(this.apiUrl,user);
    }

    login(login: any):Observable<any>{
       return this.http.post<any>(this.apiUrl2+`login`,login);
    }

    logout(){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      });
      this.http.post<any>(this.apiUrl2+`logout`,this.getUser(),{headers}).subscribe(
        {
          next:(res)=>{
            this.clearUserData();
            this.router.navigate(['login']);
          }
        }
      );
    }

    islogin():boolean{
      if(localStorage.getItem(this.tokenKey))
      {
        return true;
      }
      return false;
    }

    getUser():User{
      return JSON.parse(localStorage.getItem(this.userKey) || '{}');
    }
    private getToken():any{
      return localStorage.getItem(this.tokenKey);
    }

     storeUserData(user: any, token: string) {
      console.log('storeUserData');
      localStorage.setItem(this.userKey, JSON.stringify(user)); // Stocker l'utilisateur au format JSON
      localStorage.setItem(this.tokenKey, token); // Stocker le token
      console.log('storeUserData fin');
    }

    clearUserData() {
      localStorage.removeItem(this.userKey);
      localStorage.removeItem(this.tokenKey);
    }
}
