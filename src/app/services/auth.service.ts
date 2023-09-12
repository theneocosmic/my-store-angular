import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/user.module';
import { HttpClient } from '@angular/common/http';
import { Authentication } from '../models/auth.module';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email:string, password:string){

    if(this.tokenService.existToken()){
      console.log('existe el Token');
    }

    return this.http.post<Authentication>(`${this.apiUrl}/login`,{email,password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile(){
      return this.http.get<User>(`${this.apiUrl}/profile`
    // ,{
    //   headers:{
    //     Authorization:`Bearer ${token}`
    //   }
    // }
     ).pipe(
      tap(profile => this.saveProfile(profile))
    );;
  }

  saveProfile(profile:User){
    console.log(profile);
    localStorage.setItem('userProfile',JSON.stringify(profile));
  }

  getStoredProfile(){
    let key = 'userProfile';
    return localStorage.getItem(key);
  }

}
