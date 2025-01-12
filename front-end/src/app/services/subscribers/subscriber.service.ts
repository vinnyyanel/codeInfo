import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscriber } from '../../models/subscribers/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

   private  apiUrl:string = `http://127.0.0.1:8000/api/subscriber/`;

    constructor(private http: HttpClient) { }


    postSubscriber(subscriber:Subscriber):Observable<any>{
       return this.http.post<any>(this.apiUrl,subscriber);
    }
}
