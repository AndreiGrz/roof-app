import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeasurementsComponent } from '../partials/stepper/stepper-partials/measurements/measurements.component';
import { RoofModelsComponent } from '../partials/stepper/stepper-partials/roof-models/roof-models.component';

@Component({
  selector: 'calculator-1-apa',
  templateUrl: './calculator-1-apa.component.html',
  styleUrls: ['./calculator-1-apa.component.scss']
})
export class Calculator1ApaComponent implements OnInit, AfterViewInit {
  @ViewChild (RoofModelsComponent) roofModelsComponent: RoofModelsComponent;
  @ViewChild (MeasurementsComponent) measurementsComponent: MeasurementsComponent;

  public modelsForm: FormGroup;
  public measurementsForm: FormGroup;

  thirdFormGroup = this.formBuilder.group({
   
  });
  fourthFormGroup = this.formBuilder.group({
        
  });

  constructor( private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.modelsForm = this.roofModelsComponent.form;
    this.measurementsForm = this.measurementsComponent.form;
    this.cdr.detectChanges();
  }
}