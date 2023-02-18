import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MeasurementsComponent } from '../stepper-partials/measurements/measurements.component';
import { RoofModelsComponent } from '../stepper-partials/roof-models/roof-models.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterViewInit {
  @ViewChild (RoofModelsComponent) roofModelsComponent: RoofModelsComponent;
  @ViewChild (MeasurementsComponent) measurementsComponent: MeasurementsComponent;

  @Input() modelAcoperis: string;

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