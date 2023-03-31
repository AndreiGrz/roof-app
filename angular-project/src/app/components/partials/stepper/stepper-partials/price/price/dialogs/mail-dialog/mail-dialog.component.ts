import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-mail-dialog',
  templateUrl: './mail-dialog.component.html',
  styleUrls: ['./mail-dialog.component.scss']
})
export class MailDialogComponent implements OnInit {
    public form: FormGroup;
    submitted = false;
    gdprErr = false;

  constructor( 
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MailDialogComponent>,
    private mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

    }

  ngOnInit() {
    this.form = this.formBuilder.group({
        email: this.formBuilder.control('', [Validators.required, Validators.email]),
        nume: this.formBuilder.control('', [Validators.required]),
        politicaGDPR: this.formBuilder.control('', [Validators.required])
    });

    this.form.valueChanges.subscribe((value) => console.log(value));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitEmailInfo (){
    this.submitted = true;
    this.gdprClick();

    if (this.form.valid) {
      this.mainService.sendEmail(this.data.list, this.data.totalPrice, this.form.value)
      .subscribe(res => {
        console.log(res);
        this.dialogRef.close();
      });
    }
  }

  gdprClick(): void {
    const value = this.form.get('politicaGDPR')?.value;
    this.gdprErr = !value && this.submitted;
  }
}