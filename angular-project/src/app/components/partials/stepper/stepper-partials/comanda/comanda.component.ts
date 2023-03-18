import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss']
})
export class ComandaComponent implements OnInit {
    public form_persoanafizica: FormGroup;
    public form_persoanajuridica: FormGroup;

  constructor( 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form_persoanafizica = this.formBuilder.group({
      
        nume: this.formBuilder.control('', [Validators.required]),
        prenume: this.formBuilder.control('', [Validators.required]),
        numar_telefon: this.formBuilder.control('', [Validators.required]),
        adresaemail: this.formBuilder.control('', [Validators.required]),
        judet: this.formBuilder.control('', [Validators.required]),
        oras: this.formBuilder.control('', [Validators.required]),
        judet_livrare: this.formBuilder.control('', [Validators.required]),
        oras_livrare: this.formBuilder.control('', [Validators.required]),
        adresa_de_facturare: this.formBuilder.control('', [Validators.required]),
        adresa_de_livrare: this.formBuilder.control('', [Validators.required]),
      });

      this.form_persoanafizica.valueChanges.subscribe((value) => console.log(value));


      this.form_persoanajuridica = this.formBuilder.group({
      
        nume: this.formBuilder.control('', [Validators.required]),
        prenume: this.formBuilder.control('', [Validators.required]),
        numar_telefon: this.formBuilder.control('', [Validators.required]),
        adresaemail: this.formBuilder.control('', [Validators.required]),
        judet: this.formBuilder.control('', [Validators.required]),
        oras: this.formBuilder.control('', [Validators.required]),
        judet_livrare: this.formBuilder.control('', [Validators.required]),
        oras_livrare: this.formBuilder.control('', [Validators.required]),
        adresa_de_facturare: this.formBuilder.control('', [Validators.required]),
        adresa_de_livrare: this.formBuilder.control('', [Validators.required]),
      });

      this.form_persoanajuridica.valueChanges.subscribe((value) => console.log(value));


  }

submitContactInfo (){
    console.log(this.form_persoanafizica.value);
    console.log(this.form_persoanajuridica.value);
  }
}