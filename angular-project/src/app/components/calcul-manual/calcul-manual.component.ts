import { Component, OnInit } from '@angular/core';
import { TipCalculator } from 'src/app/enums/main.enum';

@Component({
  selector: 'calcul-manual',
  templateUrl: './calcul-manual.component.html',
  styleUrls: ['./calcul-manual.component.scss']
})
export class CalculManualComponent implements OnInit {
  public tipCalculator = TipCalculator.CALCUL_MANUAL;

  constructor() { }

  ngOnInit() {
  }

}