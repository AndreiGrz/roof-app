import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ExtraMeasurementsComponent } from '../../extra-measurements/extra-measurements/extra-measurements.component';

@Component({
  selector: 'app-dimensiuni-acoperis4ape',
  templateUrl: './dimensiuni-acoperis4ape.component.html',
  styleUrls: ['./dimensiuni-acoperis4ape.component.scss']
})
export class DimensiuniAcoperis4apeComponent implements OnInit, AfterViewInit{
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
        inaltimeTriunghi: this.formBuilder.control('', [Validators.required]),
        bazaTriunghi: this.formBuilder.control('', [Validators.required]),
        inaltimeTrapez: this.formBuilder.control('', [Validators.required]),
        bazaMareTrapez: this.formBuilder.control('', [Validators.required]),
        bazaMicaTrapez: this.formBuilder.control('', [Validators.required]),
        numarHornuri: this.formBuilder.control('', [Validators.required]),
        imparteIntaltimea: this.formBuilder.control('', [Validators.required])
      });
  }

  
  public checkSistemPluvial (event:MatCheckboxChange): void {
    this.isCheckedSistemPluvial = event.checked ? true : false;
}
}
