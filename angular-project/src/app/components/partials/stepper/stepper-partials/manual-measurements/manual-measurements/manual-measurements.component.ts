import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-measurements',
  templateUrl: './manual-measurements.component.html',
  styleUrls: ['./manual-measurements.component.scss']
})
export class ManualMeasurementsComponent implements OnInit {
  public masuratori: any[] = [];

  constructor() {}

  ngOnInit() {
    this.masuratori = [
      { bucTabla: 3, lungime: 4 }
    ];
  }

  removeInput(index: number) {
    this.masuratori.splice(index, 1);
  }

  addInputs() {
    this.masuratori.push({ bucTabla: '', lungime: '' });
  }
}
