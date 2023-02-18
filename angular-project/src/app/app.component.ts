import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { NavLink } from './models/models';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private alive = true;
  navLinks: NavLink[];

  constructor(private mainService: MainService) {
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
        label: 'Calcul manual',
        link: './calcul-manual'
      },
      {
        label: 'Calculator personalizat',
        link: './calculator-personalizat'
      },
      {
        label: 'Sistem pluvial',
        link: './sistem-pluvial'
      }
    ];
  }

  ngOnInit(): void {
    this.mainService.get()
      .pipe(takeWhile(() => this.alive))
      .subscribe(res => console.log('res', res));
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
