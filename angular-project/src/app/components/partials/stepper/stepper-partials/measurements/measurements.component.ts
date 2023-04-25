import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Measurements } from 'src/app/models/models';

@Component({
  selector: 'measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
  @Input() tipAcoperis: string;
  @Output() formData = new EventEmitter<FormGroup>();
  @Output() btnProceedToAccesories = new EventEmitter<boolean>();

  measurementCalculator_1A: FormGroup;
  measurementCalculator_2A: FormGroup;
  measurementCalculator_4A: FormGroup;

  public masuratori: Measurements;
  public isCheckedSistemPluvial: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  getMeasurementsForCalc1A(event: FormGroup): void {
    this.measurementCalculator_1A = event;
    this.cdr.detectChanges();

    this.formData.emit(this.measurementCalculator_1A);
    console.log('sssss',this.measurementCalculator_1A);
  }

  getMeasurementsForCalc2A(event: FormGroup): void {
    this.measurementCalculator_2A = event;
    this.cdr.detectChanges();

    this.formData.emit(this.measurementCalculator_2A);
  }

  getMeasurementsForCalc4A(event: FormGroup): void {
    this.measurementCalculator_4A = event;
    this.cdr.detectChanges();

    this.formData.emit(this.measurementCalculator_4A);
  }

  public proceedToAccesories() {
    this.btnProceedToAccesories.emit(true);
  }
}
