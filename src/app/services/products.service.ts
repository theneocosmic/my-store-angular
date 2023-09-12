import { environment } from './../../environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.module';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl=`${environment.API_URL}/api/v1/products`;
  constructor(
    private http: HttpClient 
  ) { }
  retry = 2;
  discountPercent=.08;

  getAllProducts(){
    return this.http.get<Product[]>(`${this.apiUrl}`)
    .pipe(
      retry(this.retry),
      map(productos => productos.map(item => {
        return {
          ...item,
            priceWithOutDiscount:item.price,
            price:(item.category.name === 'Clothes') ? item.price - (this.discountPercent * item.price):item.price,
            rebate:(item.category.name === 'Clothes') ? true :false,
            discount:(item.category.name === 'Clothes') ? this.discountPercent * 100 : 0,
            rating:Math.floor(Math.random() * 5)
        }
      }))
    );
  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
         catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Algo falló en el server');
        }

        if(error.status === HttpStatusCode.NotFound){
          return throwError('Ups no se encontró');
        }

        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('Ups no estas autorizado');
        }

        return throwError('Ups, algo salió mal');
      })
    );
  }

  getProductByPage(limit:number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{params:{limit}, context: checkTime()})
    .pipe(
      retry(this.retry)
    );
  }

  create(dto:CreateProductDTO)
  {
    return this.http.post<Product>(`${this.apiUrl}`,dto)
    .pipe(
      retry(this.retry)
    );
  }

  update(dto:UpdateProductDTO,id:string ){
    return this.http.put<Product>(`${this.apiUrl}/${id}`,dto)
    .pipe(
      retry(this.retry)
    );
  }

  fetchReadAndUpdate(dto: UpdateProductDTO,id: string) {
    return zip(
      this.getProduct(id),
      this.update(dto,id)
    );
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
    .pipe(
      retry(this.retry)
    );
  }

}
