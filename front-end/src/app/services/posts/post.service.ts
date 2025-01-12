import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user';
import { Post } from '../../models/posts/post';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private  apiUrl:string = `http://127.0.0.1:8000/api/posts`;
  private tokenKey : string = "code_info_token";

  constructor(private http: HttpClient, private router:Router) { }

  getPosts(page: number): Observable<any> {
    const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
          });
    return this.http.get<any>(`${this.apiUrl}?page=${page}`,{headers});
  }

  getPostById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
    return this.http.get<any>(this.apiUrl+`/`+id,{headers});
  }

  getCommentPostById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
    return this.http.get<any>(this.apiUrl+`/`+id+`/comments`,{headers});
  }

  getAllPost():Observable<Post[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
    return this.http.get<Post[]>(this.apiUrl,{headers});
  }

  postUserPost(post:any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
     return this.http.post<any>(this.apiUrl+`/`,post,{headers});
  }

  getPostAndComment(page: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
    return this.http.get<any>(`${this.apiUrl}?page=${page}`,{headers});
  }
  /*
    getUserPost():Observable<Post[]>{
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Message[]>(this.apiUrl+`message/`+id,{headers});
    return this.http.get<Post[]>(this.apiUrl+`posts/`+"id",{headers});
  }*/

 /* postUserMessage(message:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(message);

    return this.http.post<any>(this.apiUrl+`message`,message,{headers});
  }*/
}
