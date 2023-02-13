import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
        inaltimeaC: this.formBuilder.control('', [Validators.required]),
        inaltimeaD: this.formBuilder.control('', [Validators.required]),
        numarHornuri: this.formBuilder.control('', [Validators.required]),
        imparteIntaltimea: this.formBuilder.control('', [Validators.required])

      });
  }

  
  public checkSistemPluvial (event:MatCheckboxChange): void {
    this.isCheckedSistemPluvial = event.checked ? true : false;
}
}
