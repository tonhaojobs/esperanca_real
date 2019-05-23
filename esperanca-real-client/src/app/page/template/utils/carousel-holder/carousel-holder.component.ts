import { Component, OnInit } from '@angular/core';
import { SlidesOutputData } from 'ngx-owl-carousel-o';

@Component({
  selector: '....',
  templateUrl: 'carousel-holder.component.html'
})
export class CarouselHolderComponent {

  activeSlides: SlidesOutputData;

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  
  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }
}
