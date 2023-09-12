import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';
import { Component } from '@angular/core';
import { CreateProductDTO, Product } from './models/product.module';
import * as data from '../mock/mock.json';
import { CreateUserDTO } from './models/user.module';
import { Authentication } from './models/auth.module';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgRta ='';
  imgParent = '';
  showImage=true;
  mock:CreateProductDTO[] =[];
  // authentication:Authentication={access_token:'',refresh_token:''};
  // token='';
  constructor(
    private userService:UserService,
    private authService:AuthService,
    private productsService : ProductsService,
    private filesService: FilesService
  ){

  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

toggleImage(){
  this.showImage=!this.showImage;
}

createUser(){
  let newUser :CreateUserDTO ={
      name:"David",
      email:"david@correo.com",
      password:"dzul",
      avatar:"https://livecodestream.dev/post/the-battle-of-the-js-frameworks-angulars-developer-point-of-view/featured.jpg"
  }
  this.userService.create(newUser)
  .subscribe((rta)=>{
    console.log(rta);
  });
}


fillMockData(){
  this.mock = data.default;

  this.mock.forEach((producto) => {
    this.productsService.create(producto)
    .subscribe((data)=>{
      console.log(data);
    
    });
  });

  
}

downloadPDF(){
  this.filesService.getFile('my_pdf','https://2muchcoffee.com/angular-web-development/2muchcoffee_Angular_Best_Practices.pdf','application/pdf')
  .subscribe(()=>{

  });
}

onUpload(event: Event){
  const element = event.target as HTMLInputElement;
  const file = element.files?.item(0);
  
  if(file){
    this.filesService.uploadFile(file)
    .subscribe(rta => {
      this.imgRta = rta.location;
    })
}

}




}
