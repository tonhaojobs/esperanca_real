import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slides = [
    {img: "https://assets-global.website-files.com/58531d7256ce728d0ed5fcf1/5cbf52b6213269e2f7be08aa_Image-Gallery-1-.jpg"},
    {img: "https://assets-global.website-files.com/58531d7256ce728d0ed5fcf1/5cbf52b6213269e2f7be08aa_Image-Gallery-1-.jpg"},
    {img: "https://assets-global.website-files.com/58531d7256ce728d0ed5fcf1/5cbf52b6213269e2f7be08aa_Image-Gallery-1-.jpg"}
  ];

  slideConfig = {
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: true
  };
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
  

}
