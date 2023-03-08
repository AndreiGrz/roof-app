import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TipCalculator } from 'src/app/enums/main.enum';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input() tipCalculator: string;
  tipCalculatorEnum = TipCalculator;
  
  modelsForm: FormGroup;
  measurementsForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  getModelsForm(event: FormGroup): void {
    this.modelsForm = event;
    this.cdr.detectChanges();

    console.log(this.modelsForm.value);
  }

  getMeasurementsForm(event: FormGroup): void {
    this.measurementsForm = event;
    this.cdr.detectChanges();

    console.log(this.measurementsForm.value);
  }
}
