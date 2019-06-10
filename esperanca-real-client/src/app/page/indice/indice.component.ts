import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { SlidesOutputData } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['asasas', 'sdadsad'],
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

  slidesStore: any[] = [
    { id: 'slide_1', src: 'assets/img/books/yellow.png', alt: 'teste1', title: 'teste1' },
    { id: 'slide_2', src: 'assets/img/screeenshot-2.jpg', alt: 'teste2', title: 'teste2' },
    { id: 'slide_3', src: 'assets/img/screeenshot-3.jpg', alt: 'teste3', title: 'teste3' }
    
  ];

  activeSlides: SlidesOutputData;

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

}
