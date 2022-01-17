import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor() {}
  users: any[];

  ngOnInit() {}

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 4000,
    },
  };
}
