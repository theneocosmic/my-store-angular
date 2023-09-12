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
    title:'',
    price:0,
    images:[],
    description:'',
    category: {
      id: '',
      name: '',
      image: ''
    },
    rating:1
  };
  
  @Output() addProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }


  ngAfterViewInit(): void {
    console.log(this.product);
  
}


  onAddToCart(){
    this.addProduct.emit(this.product);
  }

  showDetail(){
    this.showProduct.emit(this.product.id);
  }
 

}
