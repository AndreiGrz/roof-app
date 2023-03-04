import { Component, OnInit } from '@angular/core';
import { TipCalculator } from 'src/app/enums/main.enum';

@Component({
  selector: 'calculator-2-ape',
  templateUrl: './calculator-2-ape.component.html',
  styleUrls: ['./calculator-2-ape.component.scss']
})
export class Calculator2ApeComponent implements OnInit {
  public tipCalculator = TipCalculator.ACOPERIS_2_APE;
  
  constructor() { }

  ngOnInit() {
    
  }

}