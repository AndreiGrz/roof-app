import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AddNewMeasurementDialogComponent } from 'src/app/dialogs/add-new-measurement-dialog/add-new-measurement-dialog';
import { Measurements, Options } from 'src/app/models/models';

@Component({
  selector: 'measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
    public form: FormGroup;
    public masuratori: Measurements;
    public isCheckedSistemPluvial: boolean = false;
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

  constructor( private formBuilder: FormBuilder,
                public dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        latimea: this.formBuilder.control('', [Validators.required]),
        inaltimea: this.formBuilder.control('', [Validators.required]),
        numarHornuri: this.formBuilder.control('', [Validators.required]),
        imparteIntaltimea: this.formBuilder.control('', [Validators.required])

      });
  }

  public checkSistemPluvial (event:MatCheckboxChange): void {
        this.isCheckedSistemPluvial = event.checked ? true : false;
  }

  public openDialog(): void{
    const dialogRef = this.dialog.open(AddNewMeasurementDialogComponent, {
        data: null,
      });
  
      dialogRef.afterClosed().subscribe(result => {
            //save data in a new card or smth
      });
    }
}