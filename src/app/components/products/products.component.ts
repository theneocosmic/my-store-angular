import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.module';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  public productos: Product[] =[];
  myShoppingCart:Product[]=[];
  total:number=0;
  today= new Date(2022,9,7);
  date=new Date(2023,9,7);

  constructor(
    private productsService:ProductsService,
    private storeService :StoreService
    ) {
      this.myShoppingCart = this.storeService.getShoppingCart();
    }
    

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data  => {
            this.productos=data;
        });
  }


 

  onAddToShoppingCart(product:Product){
    this.storeService.addProduct(product);
    this.total=this.storeService.getTotal();
  }

}
