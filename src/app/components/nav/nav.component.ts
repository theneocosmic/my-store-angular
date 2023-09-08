import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  icons="../../../assets/icons/";
  counter =0;
  total =0;
  constructor(
    private storeService:StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
      this.total = products.reduce((sum,item)=>sum + item.price,0);
    });
  }

}
