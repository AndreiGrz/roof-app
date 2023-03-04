import { Component, Input, OnInit } from '@angular/core';
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

  public form: FormGroup;
  public masuratori: Measurements;
  public isCheckedSistemPluvial: boolean = false;

  constructor( private formBuilder: FormBuilder,
                public dialog: MatDialog,
                ) { }

  ngOnInit() {}

  public openDialog(): void{
    const dialogRef = this.dialog.open(AddNewMeasurementDialogComponent, {
        data: null,
      });
  
      dialogRef.afterClosed().subscribe(result => {
            //save data in a new card or smth
      });
    }
}