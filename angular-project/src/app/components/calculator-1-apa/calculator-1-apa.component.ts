import { Component, OnInit } from '@angular/core';
import { TipCalculator } from 'src/app/enums/main.enum';

@Component({
  selector: 'calculator-1-apa',
  templateUrl: './calculator-1-apa.component.html',
  styleUrls: ['./calculator-1-apa.component.scss']
})
export class Calculator1ApaComponent implements OnInit {
  tipCalculator = TipCalculator.ACOPERIS_1_APA;
  constructor() { }

  ngOnInit() {
    
  }
}