import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calcul-manual',
  templateUrl: './calcul-manual.component.html',
  styleUrls: ['./calcul-manual.component.scss']
})
export class CalculManualComponent implements OnInit {
  public modelAcoperis: string = "Calcul-manual";

  constructor() { }

  ngOnInit() {
  }

}