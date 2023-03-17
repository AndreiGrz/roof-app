import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
    public form: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        numar_telefon: this.formBuilder.control('', [Validators.required]),
        nume: this.formBuilder.control('', [Validators.required]),
        prenume: this.formBuilder.control('', [Validators.required]),
        info_suplimentare: this.formBuilder.control(''),
      });

      this.form.valueChanges.subscribe((value) => console.log(value));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitContactInfo (){
    console.log(this.form.value);
  }
}