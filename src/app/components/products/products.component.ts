import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.module';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import { switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  imageDefault = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';
  
  public productos: Product[] =[];
  myShoppingCart:Product[]=[];
  limit=10;
  statusDetail : 'loading'|'success'|'error' | 'init' = 'init';
  
  showProductDetail = false;
  productChosen:Product = {
    id:'',
    price:0,
    images:[],
    title:'',
    description:'',
    category:{
      id: '',
      name: '',
      image: ''
    },
    rating:0
    }

   constructor(
    private productsService:ProductsService,
    private storeService :StoreService
    ) {
      this.myShoppingCart = this.storeService.getShoppingCart();
    }
  discountPercent=.08;
    

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data  => {
      console.log('obteniendo todos los productos');
      console.log(data);
            this.productos=data;
            
        });
  }


  imgError() {
    this.productChosen.images.unshift(this.imageDefault); 
    console.log(this.productChosen.images);
  }

  onAddToShoppingCart(product:Product){
    this.storeService.addProduct(product);
  }

toggleProductDetail(){
  this.showProductDetail = !this.showProductDetail;
}

complementProduct(item:Product){
  item.priceWithOutDiscount=item.price;
  item.price=(item.category.name === 'Clothes') ? item.price - (this.discountPercent * item.price):item.price;
  item.rebate=(item.category.name === 'Clothes') ? true :false;
  item.discount=(item.category.name === 'Clothes') ? this.discountPercent * 100 : 0;
  item.rating=Math.floor(Math.random() * 5);
  return item;
}

onShowDetail(id:string){
  this.statusDetail='loading';
  this.productsService.getProduct(id)
  .subscribe(
    data =>{
      console.log(data);
      this.toggleProductDetail();
      this.productChosen = this.complementProduct(data);
      this.statusDetail='success';
    },
    error =>{
      this.statusDetail='error';
      console.error(error);
    }
  )
}

createNewProduct(){
  const product:CreateProductDTO={
      title: "Dzul - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 999,
      description: "Dzul 00% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
      categoryId:1,
      images: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
  }
  this.productsService.create(product).subscribe(data =>{
    console.log(data);
    this.productos.unshift(data);
  });
}

readAndUpdate(id: string) {
  this.productsService.getProduct(id)
  .pipe(
    switchMap((product) => this.productsService.update({title: 'change'},product.id)),
  )
  .subscribe(data => {
    console.log(data);
  });
  this.productsService.fetchReadAndUpdate({title: 'change'},id)
  .subscribe(response => {
    const read = response[0];
    const update = response[1];
  })
}

updateProduct(){
  const changes : UpdateProductDTO={
    description:this.productChosen.description,
    title:'nuevo titulo',
    price:this.productChosen.price,
    rating:this.productChosen.rating,
    images:this.productChosen.images,
    id:this.productChosen.id,
    category:this.productChosen.category  }

  const id = this.productChosen.id;
  this.productsService.update(changes,id).subscribe(data =>{
    console.log('update');
    console.log(data);
    const productIndex = this.productos.findIndex(item => item.id === this.productChosen.id);
    this.productos[productIndex]=data;
    this.productChosen = data;
  });
}

deleteProduct(){
  const id= this.productChosen.id;
  this.productsService.delete(id).subscribe(()=>{
    const productIndex = this.productos.findIndex(item => item.id === this.productChosen.id);
this.productos.splice(productIndex,1); 
this.showProductDetail=false;
  });
}

loadMore(){
  this.productsService.getProductByPage(this.limit).subscribe((data)=>{
    this.productos = this.productos.concat(data);
  });
}

}
