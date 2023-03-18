import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Diametri } from 'src/app/enums/main.enum';

@Component({
  selector: 'app-dimensiuni-acoperis1apa',
  templateUrl: './dimensiuni-acoperis1apa.component.html',
  styleUrls: ['./dimensiuni-acoperis1apa.component.scss']
})
export class DimensiuniAcoperis1apaComponent implements OnInit, AfterViewInit{  
  public form: FormGroup;
  public isCheckedSistemPluvial: boolean = false;
  @Output() formData = new EventEmitter<FormGroup>();
  public diametri = Diametri
  
  lungimea_2: number;
  latimea_3: number;
  inaltimea_1: number;
  numarHornuri: number;
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
    this.form = this.formBuilder.group({
        lungimea_2: this.formBuilder.control('', [Validators.required]),
        latimea_3: this.formBuilder.control('', [Validators.required]),
        inaltimea_1: this.formBuilder.control('', [Validators.required]),
        numarHornuri: this.formBuilder.control('', [Validators.required]),
        diametru: this.formBuilder.control('', [Validators.required]),
      });

      this.getData();
  }

  private getData = () => {
    this.form.get('lungimea_2')?.valueChanges.subscribe(value => {
      this.lungimea_2 = value;
    });
    this.form.get('latimea_3')?.valueChanges.subscribe(value => {
      this.latimea_3 = value;

    });
    this.form.get('inaltimea_1')?.valueChanges.subscribe(value => {
      this.inaltimea_1 = value;

    });
    this.form.get('numarHornuri')?.valueChanges.subscribe(value => {
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
