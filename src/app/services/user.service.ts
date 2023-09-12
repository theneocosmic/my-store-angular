import { Injectable } from '@angular/core';
import { CreateUserDTO, User } from '../models/user.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.API_URL}/api/v1/users`;

  constructor(
    private http: HttpClient

  ) { }

  create(dto: CreateUserDTO){
    return this.http.post<User>(this.apiUrl,dto);
  }

}
