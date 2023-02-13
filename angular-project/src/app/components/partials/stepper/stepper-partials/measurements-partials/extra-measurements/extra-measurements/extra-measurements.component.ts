import { Component, OnInit } from '@angular/core';
import { Options } from 'src/app/models/models';

@Component({
  selector: 'app-extra-measurements',
  templateUrl: './extra-measurements.component.html',
  styleUrls: ['./extra-measurements.component.scss']
})
export class ExtraMeasurementsComponent implements OnInit {
  public finisaje: Options[] = [
    {id: '0', value: 'Clasic'},
    {id: '1', value: 'Balcanic'},
    {id: '2', value: 'Gotic'},
  ];
  public culori: Options[] = [
    {id: '0', value: 'Clasic'},
    {id: '1', value: 'Balcanic'},
    {id: '2', value: 'Gotic'},
  ];
  public diametri: Options[] = [
    {id: '0', value: '125/90'},
    {id: '1', value: '150/100'},
  ];

  construnctor () {
  }

  ngOnInit(): void {
    
  }
}
