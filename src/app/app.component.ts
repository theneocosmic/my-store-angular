import { Component } from '@angular/core';
import { Product } from './models/product.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImage=true;
  

  onLoaded(img: string) {
    console.log('log padre', img);
  }

toggleImage(){
  this.showImage=!this.showImage;
}

}
