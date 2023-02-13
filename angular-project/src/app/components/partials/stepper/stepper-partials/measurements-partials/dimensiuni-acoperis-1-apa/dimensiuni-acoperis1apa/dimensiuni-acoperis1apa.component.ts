import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ExtraMeasurementsComponent } from '../../extra-measurements/extra-measurements/extra-measurements.component';

@Component({
  selector: 'app-dimensiuni-acoperis1apa',
  templateUrl: './dimensiuni-acoperis1apa.component.html',
  styleUrls: ['./dimensiuni-acoperis1apa.component.scss']
})
export class DimensiuniAcoperis1apaComponent implements OnInit, AfterViewInit{
  @ViewChild (ExtraMeasurementsComponent) roofModelsComponent: ExtraMeasurementsComponent;
  
  public form: FormGroup;
  public isCheckedSistemPluvial: boolean = false;

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
        latimea: this.formBuilder.control('', [Validators.required]),
        inaltimea: this.formBuilder.control('', [Validators.required]),
        numarHornuri: this.formBuilder.control('', [Validators.required]),
        imparteIntaltimea: this.formBuilder.control('', [Validators.required])

      });
  }

  
  public checkSistemPluvial (event:MatCheckboxChange): void {
    this.isCheckedSistemPluvial = event.checked ? true : false;
}
}
