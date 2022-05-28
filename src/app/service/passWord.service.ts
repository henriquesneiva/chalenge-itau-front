import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Password } from '../model/passWord/passWord.model';
import { MessagePassword } from '../model/passWord/message.model';



@Injectable({
    providedIn: 'root'
  })
export class PasswordService {

    baseUrl: string = environment.baseUrl + 'api/check-password';

    constructor( private http: HttpClient ) {}

    public checkPassword(passWord: Password):Observable<MessagePassword> {
        return this.http.post<MessagePassword>(`${this.baseUrl}`, passWord);
    }
}