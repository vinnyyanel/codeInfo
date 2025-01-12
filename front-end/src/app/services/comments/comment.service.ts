import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private  apiUrl:string = `http://127.0.0.1:8000/api/comments`;
  private tokenKey : string = "code_info_token";

  constructor(private http: HttpClient) { }

    getCommentsForPost():Observable<Comment[]>{

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
      });
      return this.http.get<Comment[]>(this.apiUrl,{headers});
    }

    postComment(data:any):Observable<any>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
      });
      return this.http.post<any>(this.apiUrl,data,{headers});
    }
}
