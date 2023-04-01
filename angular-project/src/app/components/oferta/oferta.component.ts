import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const {id, tipCalculator} = params;
      console.log(id, tipCalculator);

      if (tipCalculator === '1A') {
        this.router.navigate(['/calculator-1-apa'], { queryParams: params });
      } else if (tipCalculator === '2A') {
        this.router.navigate(['/calculator-2-ape'], { queryParams: params });
      } else if (tipCalculator === '4A') {
        this.router.navigate(['/calculator-4-ape'], { queryParams: params });
      } else {
        alert('not found');
      }
    });
  }

}
