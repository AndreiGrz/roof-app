import { Component, OnInit } from '@angular/core';
import { TipCalculator } from 'src/app/enums/main.enum';

@Component({
  selector: 'calculator-4-ape',
  templateUrl: './calculator-4-ape.component.html',
  styleUrls: ['./calculator-4-ape.component.scss']
})
export class Calculator4ApeComponent implements OnInit {
  public tipCalculator = TipCalculator.ACOPERIS_4_APE;
  
  constructor() { }

  ngOnInit() {
  }

}