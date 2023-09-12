import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChange, SimpleChanges } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

img:string = '';

//eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') 
  set changeImg(newImg:string){
    this.img = newImg;
    console.log('change just img =>',this.img);
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

  constructor() {
    // before render
    // NO async -- once time
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    // before - during render
    // changes inputs -- multiples times
    console.log('ngOnChanges', 'imgValue =>', this.img);
    console.log(changes);
  }

  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    console.log('ngOnInit', 'imgValue =>', this.img);

  }

  ngAfterViewInit() {
    // after render
    // handler children -- once time
    console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    // delete -- once time
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}