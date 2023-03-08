import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddNewMeasurementDialogComponent } from 'src/app/dialogs/add-new-measurement-dialog/add-new-measurement-dialog';
import { TipCalculator } from 'src/app/enums/main.enum';
import { Measurements } from 'src/app/models/models';

@Component({
  selector: 'measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  @Input() tipAcoperis: string;
  @Output() formData = new EventEmitter<FormGroup>();

  measurementCalculator_1A : FormGroup;
  measurementCalculator_2A : FormGroup;
  measurementCalculator_4A : FormGroup;

  public masuratori: Measurements;
  public isCheckedSistemPluvial: boolean = false;

  constructor( private formBuilder: FormBuilder,
                public dialog: MatDialog,
                private cdr: ChangeDetectorRef
                ) { }

  ngOnInit() {

  }

  getMeasurementsForCalc1A(event: FormGroup): void {
    this.measurementCalculator_1A = event;
    this.cdr.detectChanges();

    this.formData.emit(this.measurementCalculator_1A);
    this.measurementCalculator_1A.valueChanges.subscribe(() => this.formData.emit(this.measurementCalculator_1A));
  }

  getMeasurementsForCalc2A(event: FormGroup): void {
    this.measurementCalculator_2A = event;
    this.cdr.detectChanges();

   this.formData.emit(this.measurementCalculator_2A);
   this.measurementCalculator_2A.valueChanges.subscribe(() => this.formData.emit(this.measurementCalculator_2A));
  }

  getMeasurementsForCalc4A(event: FormGroup): void {
    this.measurementCalculator_4A = event;
    this.cdr.detectChanges();

   this.formData.emit(this.measurementCalculator_4A);
   this.measurementCalculator_4A.valueChanges.subscribe(() => this.formData.emit(this.measurementCalculator_4A));
  }




  // public openDialog(): void{
  //   const dialogRef = this.dialog.open(AddNewMeasurementDialogComponent, {
  //       data: null,
  //     });
  
  //     dialogRef.afterClosed().subscribe(result => {
  //           //save data in a new card or smth
  //     });
  //   }
}