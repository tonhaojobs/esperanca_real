import { Component, OnInit } from '@angular/core';
import { CarouselHolderComponent } from '../template/utils/carousel-holder/carousel-holder.component';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {
  
  slidesStore: Array<any> = [
    { id: '1', src: 'assets/img/screeenshot-1.jpg', alt: 'teste' },
    { id: '2', src: 'assets/img/screeenshot-1.jpg', alt: 'teste' },
    { id: '3', src: 'assets/img/screeenshot-1.jpg', alt: 'teste' },
    { id: '4', src: 'assets/img/screeenshot-1.jpg', alt: 'teste' },
    { id: '5', src: 'assets/img/screeenshot-1.jpg', alt: 'teste' }
  ];
  
  constructor(private carouselHolderComponent_: CarouselHolderComponent) { }

  ngOnInit() {
  }

}