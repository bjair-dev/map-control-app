import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
})
export class PreloaderComponent implements OnInit {
  constructor(public router: Router) {
    setTimeout(() => {
      localStorage.removeItem('email');
      localStorage.removeItem('pass');
      localStorage.removeItem('cofide_token');
      this.router.navigateByUrl('splash');
    }, 3000);
  }

  ngOnInit() {}
}
