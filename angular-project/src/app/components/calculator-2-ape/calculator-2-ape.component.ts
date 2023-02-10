import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MeasurementsComponent } from '../partials/stepper/stepper-partials/measurements/measurements.component';
import { RoofModelsComponent } from '../partials/stepper/stepper-partials/roof-models/roof-models.component';

@Component({
  selector: 'calculator-2-ape',
  templateUrl: './calculator-2-ape.component.html',
  styleUrls: ['./calculator-2-ape.component.scss']
})
export class Calculator2ApeComponent implements OnInit {
  @ViewChild (RoofModelsComponent) roofModelsComponent: RoofModelsComponent;
  @ViewChild (MeasurementsComponent) measurementsComponent: MeasurementsComponent;

  public modelsForm: FormGroup;
  public measurementsForm: FormGroup;

  thirdFormGroup = this.formBuilder.group({
   
  });
  fourthFormGroup = this.formBuilder.group({
        
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.modelsForm = this.roofModelsComponent.form;
    // this.measurementsForm = this.measurementsComponent.form;
  }

  ngAfterViewInit(): void {
    this.modelsForm = this.roofModelsComponent.form;
    this.measurementsForm = this.measurementsComponent.form;
  }

}