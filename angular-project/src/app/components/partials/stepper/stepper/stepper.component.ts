import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TipCalculator } from 'src/app/enums/main.enum';
import { ModelDimensiuniAcoperis1A, ModelDimensiuniAcoperis2A, ModelDimensiuniAcoperis4A, ModelTabla } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input() tipCalculator: string;
  tipCalculatorEnum = TipCalculator;
  
  modelsForm: FormGroup;
  measurementsForm: FormGroup;

  public infoTabla: ModelTabla;
  public dimensiuniAcoperis1A : ModelDimensiuniAcoperis1A;
  public dimensiuniAcoperis2A : ModelDimensiuniAcoperis2A;
  public dimensiuniAcoperis4A : ModelDimensiuniAcoperis4A;

  public necesarAccesorii: any;

  constructor(private cdr: ChangeDetectorRef,
                    private mainService: MainService) {}

  ngOnInit(): void {
    this.infoTabla = new ModelTabla();
    this.dimensiuniAcoperis1A = new ModelDimensiuniAcoperis1A();
    this.dimensiuniAcoperis2A = new ModelDimensiuniAcoperis2A();
    this.dimensiuniAcoperis4A = new ModelDimensiuniAcoperis4A();
  }

  getModelsForm(event: FormGroup): void {
    this.modelsForm = event;
    this.cdr.detectChanges();

    console.log(this.modelsForm.value);
  }

  getMeasurementsForm(event: FormGroup): void {
    this.measurementsForm = event;
    this.cdr.detectChanges();

    console.log(this.measurementsForm.value);
  }

  getBtnProceedToAccesoriesState(event:boolean){
    // this.cdr.detectChanges();
    const btnState = event;
    if (btnState){
     this.sendDataToServer();
    } else {
      return;
    }
  }

  private sendDataToServer(){
    this.createModelInfoTabla();
    switch (this.tipCalculator){
      case '1A':
        this.createModelDimensiuniCalculator1A();
        this.getAccesorii(this.infoTabla, this.dimensiuniAcoperis1A, this.tipCalculator);
        break;
      case '2A':
        this.createModelDimensiuniCalculator2A();
        this.getAccesorii(this.infoTabla, this.dimensiuniAcoperis2A, this.tipCalculator);

        break;
      case '4A':
        this.createModelDimensiuniCalculator4A();
        this.getAccesorii(this.infoTabla, this.dimensiuniAcoperis4A, this.tipCalculator);
    }
  }

  private getAccesorii (infoTabla:ModelTabla, infoDimensiuni: any, tipCalculator: string ){
    this.mainService.getAccesorii(infoTabla, infoDimensiuni, tipCalculator).subscribe( {
      next: (accesorii) =>{
        this.necesarAccesorii = accesorii;
        console.log(accesorii);
      },
      error: (err: HttpErrorResponse ) =>{
        console.log(err.error.message);
      }
    });
  }

  private createModelInfoTabla(): void{
    Object.assign(this.infoTabla, this.modelsForm.value);
  }

  private createModelDimensiuniCalculator1A (): void{
    Object.assign(this.dimensiuniAcoperis1A, this.measurementsForm.value);
  }

  private createModelDimensiuniCalculator2A (): void{
    Object.assign(this.dimensiuniAcoperis2A, this.measurementsForm.value);
  }

  private createModelDimensiuniCalculator4A (): void{
    Object.assign(this.dimensiuniAcoperis4A, this.measurementsForm.value);
  }
}
