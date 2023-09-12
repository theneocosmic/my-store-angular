import { TokenInterceptor } from './../../interceptors/token.interceptor';
import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/models/auth.module';
import { UserProfile } from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  icons="../../../assets/icons/";
  counter =0;
  total =0;
  profile:UserProfile  =  {
    id:'',
    email:'',
    password:'',
    name:'',
    role:'',
    avatar:'',
    creationAt:'',
    updateAt:''
  
  }

  authentication:Authentication={access_token:'',refresh_token:''};
  token='';
  constructor(
    private storeService:StoreService,
    private userService:UserService,
    private authService:AuthService,
    private productsService : ProductsService,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
      this.total = products.reduce((sum,item)=>sum + item.price,0);
      this.getProfile();
    });
  }



  login(){
    this.authService.login('david@correo.com','dzul')
   .subscribe((rta)=>{
     console.log(rta);
      this.authentication.access_token= rta.access_token;
      this.authentication.refresh_token= rta.refresh_token;
      if(this.tokenService.existToken()){
          this.getProfile();
      }
   });
 }
 
 getProfile(){
    this.authService.getProfile()
    .subscribe(profile => {
      this.profile = profile;
      console.log(profile)
    }
    );
  }
 }



