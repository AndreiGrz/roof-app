import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ExtraMeasurementsComponent } from '../../extra-measurements/extra-measurements/extra-measurements.component';

@Component({
  selector: 'app-dimensiuni-acoperis2ape',
  templateUrl: './dimensiuni-acoperis2ape.component.html',
  styleUrls: ['./dimensiuni-acoperis2ape.component.scss']
})
export class DimensiuniAcoperis2apeComponent implements OnInit, AfterViewInit{
  @ViewChild (ExtraMeasurementsComponent) roofModelsComponent: ExtraMeasurementsComponent;
  
  public form: FormGroup;
  public isCheckedSistemPluvial: boolean = false;
  @Output() formData = new EventEmitter<FormGroup>();


  inaltimea_1: number;
  lungimea_3: number;
  latimea_4: number;
  latimea_2: number;
  numarHornuri: number;

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
        inaltimea_1: this.formBuilder.control('', [Validators.required]),
        lungimea_3: this.formBuilder.control('', [Validators.required]),
        latimea_4: this.formBuilder.control('', [Validators.required]),
        latimea_2: this.formBuilder.control('', [Validators.required]),
        numarHornuri: this.formBuilder.control('', [Validators.required]),
      });

    this.getData();
  }

  private getData = () => {
    this.form.get('inaltimea_1')?.valueChanges.subscribe(value => {
      this.inaltimea_1 = value;
    });
    this.form.get('lungimea_3')?.valueChanges.subscribe(value => {
      this.lungimea_3 = value;

    });
    this.form.get('latimea_4')?.valueChanges.subscribe(value => {
      this.latimea_4 = value;

    });
    this.form.get('latimea_2')?.valueChanges.subscribe(value => {
      this.latimea_2 = value;
    });

    this.form.get('numarHornuri')?.valueChanges.subscribe(value => {
      this.numarHornuri = value;
    });

    this.formData.emit(this.form);
    this.form.valueChanges.subscribe(() => this.formData.emit(this.form));
  }

  
  public checkSistemPluvial (event:MatCheckboxChange): void {
    this.isCheckedSistemPluvial = event.checked ? true : false;
}
}
