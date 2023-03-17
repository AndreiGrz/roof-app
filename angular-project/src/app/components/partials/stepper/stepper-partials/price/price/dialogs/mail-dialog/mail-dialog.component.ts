import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mail-dialog',
  templateUrl: './mail-dialog.component.html',
  styleUrls: ['./mail-dialog.component.scss']
})
export class MailDialogComponent implements OnInit {
    public form: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        email: this.formBuilder.control('', [Validators.required, Validators.email]),
        politicaGDPR: this.formBuilder.control('', [Validators.required])
      });

      this.form.valueChanges.subscribe((value) => console.log(value));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitEmailInfo (){
    console.log(this.form.value);
  }
}