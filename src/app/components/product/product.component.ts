import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.module';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product={
    id:'',
    price:0,
    image:'',
    title:'',
    description:'',
    category:''
  };
  
  @Output() addProduct = new EventEmitter<Product>();

  constructor() { }



  onAddToCart(){
    this.addProduct.emit(this.product);
  }

 

}
