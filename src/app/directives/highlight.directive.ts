import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter(){
    console.log('mouseEnter');
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.border = '';

  }

  constructor(
    private element:ElementRef
  ) { 
    //this.element.nativeElement.style.backgroundColor = 'red';
  }

}
