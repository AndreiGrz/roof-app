import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Diametri } from 'src/app/enums/main.enum';

@Component({
  selector: 'app-dimensiuni-acoperis4ape',
  templateUrl: './dimensiuni-acoperis4ape.component.html',
  styleUrls: ['./dimensiuni-acoperis4ape.component.scss']
})
export class DimensiuniAcoperis4apeComponent implements OnInit, AfterViewInit{
  public form: FormGroup;
  public isCheckedSistemPluvial: boolean = false;
  @Output() formData = new EventEmitter<FormGroup>();
  public diametri = Diametri;

  inaltimea_1:number;
  lungimea_2:number;
  latimea_3:number;
  linia_4:number;
  cateta_5:number;
  adancimea_6:number;
  adancimea_7:number;
  numarHornuri:number;
  diametru: string;

  constructor(
              private formBuilder: FormBuilder,
              private cdr: ChangeDetectorRef
            ){}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    //get data from ExtraMeasurementsComponent
  }

  ngOnInit() {
    this.createFormControl();
  }

  createFormControl () {
    this.form = this.formBuilder.group({
      inaltimea_1: this.formBuilder.control('', [Validators.required]),
      lungimea_2: this.formBuilder.control('', [Validators.required]),
      latimea_3: this.formBuilder.control('', [Validators.required]),
      linia_4: this.formBuilder.control('', [Validators.required]),
      cateta_5: this.formBuilder.control('', [Validators.required]),
      adancimea_6: this.formBuilder.control('', [Validators.required]),
      adancimea_7: this.formBuilder.control('', [Validators.required]),
      numarHornuri: this.formBuilder.control('', [Validators.required]),
      diametru: this.formBuilder.control('', [Validators.required]),
    });

    this.getData();
  }

  private getData = () => {
    this.form.get('inaltimea_1')?.valueChanges.subscribe(value => {
      this.inaltimea_1 = value;
    });
    this.form.get('lungimea_2')?.valueChanges.subscribe(value => {
      this.lungimea_2 = value;

    });
    this.form.get('linia_4')?.valueChanges.subscribe(value => {
      this.linia_4 = value;

    });
    this.form.get('cateta_5')?.valueChanges.subscribe(value => {
      this.cateta_5 = value;
    });

    this.form.get('adancimea_6')?.valueChanges.subscribe(value => {
      this.adancimea_6 = value;
    });

    this.form.get('adancimea_7')?.valueChanges.subscribe(value => {
      this.adancimea_7 = value;
    });

    this.form.get('adancimea_6')?.valueChanges.subscribe(value => {
      this.numarHornuri = value;
    });

    this.form.get('diametru')?.valueChanges.subscribe(value => {
      this.diametru = value;
    });

    this.formData.emit(this.form);
    this.form.valueChanges.subscribe(() => this.formData.emit(this.form));
  }

  
  public checkSistemPluvial (event:MatCheckboxChange): void {
    this.isCheckedSistemPluvial = event.checked ? true : false;
}
}
