import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'angular-project';
  public navLinks: any[];
  public activeLinkIndex = -1;

  constructor(private router: Router){
    this.navLinks = [
          {
            label: 'Calculator 1 apa',
            link: './calculator_1apa',
            index: 0
        }, 
        {
            label: 'Calculator 2 ape',
            link: './calculator_2ape',
            index: 1
        }, 
        {
            label: 'Calculator 4 ape',
            link: './calculator_4ape',
            index: 2
        },
        {
          label: 'Calculator personalizat',
          link: './calculator_personalizat',
          index: 2
        },
        {
          label: 'Calcul manual',
          link: './calcul_manual',
          index: 2
        },
        {
          label: 'Sistem pluvial',
          link: './sistem_pluvial',
          index: 2
        },
    ]
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}

