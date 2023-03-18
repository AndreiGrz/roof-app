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
        label: 'Calculator 1 apa',
        link: './calculator-1-apa'
      },
      {
        label: 'Calculator 2 ape',
        link: './calculator-2-ape'
      },
      {
        label: 'Calculator 4 ape',
        link: './calculator-4-ape'
      },
      {
        label: 'Calculator personalizat',
        link: './calculator-personalizat'
      }
    ];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
