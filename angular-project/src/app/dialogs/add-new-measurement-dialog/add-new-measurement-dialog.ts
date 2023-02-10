import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-new-measurement-dialog',
  templateUrl: './add-new-measurement-dialog.html',
  styleUrls: ['./add-new-measurement-dialog.scss']
})
export class AddNewMeasurementDialogComponent implements OnInit {

  constructor( 
    public dialogRef: MatDialogRef<AddNewMeasurementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}