import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl:string=`http://127.0.0.1:8000/api/users`;
  private tokenKey : string = "code_info_token";

  constructor(private http:HttpClient) { }

  getAllUser():Observable<User[]>{
   /* const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });*/
    return this.http.get<User[]>(this.apiUrl);
  }

  postUser(user:any):Observable<any>{
    const headers = new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
              });
    return this.http.post<any>(this.apiUrl,user,{headers});
  }
/*
  getUser():Observable<User>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User>(this.apiUrl+`user/`+1);
  }*/
}
