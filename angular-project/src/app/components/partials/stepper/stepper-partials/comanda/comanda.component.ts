import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit {
    public form: FormGroup;

  constructor( 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        numar_telefon: this.formBuilder.control('', [Validators.required]),
        nume: this.formBuilder.control('', [Validators.required]),
        prenume: this.formBuilder.control('', [Validators.required]),
        info_suplimentare: this.formBuilder.control(''),
      });

      this.form.valueChanges.subscribe((value) => console.log(value));
  }

submitContactInfo (){
    console.log(this.form.value);
  }
}