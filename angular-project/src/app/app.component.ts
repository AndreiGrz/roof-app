import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavLink } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  navLinks: NavLink[];

  constructor() {
    this.navLinks = [
      {
        label: 'Acoperis 1 apa',
        link: './calculator-1-apa'
      },
      {
        label: 'Acoperis 2 ape',
        link: './calculator-2-ape'
      },
      {
        label: 'Acoperis 4 ape',
        link: './calculator-4-ape'
      },
      {
        label: 'Acoperis personalizat',
        link: './calculator-personalizat'
      }
    ];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
