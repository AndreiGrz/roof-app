import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { TipCalculator } from 'src/app/enums/main.enum';
import {
  ModelDimensiuniAcoperis1A,
  ModelDimensiuniAcoperis2A,
  ModelDimensiuniAcoperis4A,
  ModelTabla,
} from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  @Input() tipCalculator: string;
  tipCalculatorEnum = TipCalculator;
  loader: boolean = true;
  trigger$ = new Subject<any>();
  isLinear = true;

  modelsForm: FormGroup;
  measurementsForm: FormGroup;
  btnProceedToPrice: any;
  infoNecesarAccesorii: any;

  public infoTabla: ModelTabla;
  public dimensiuniAcoperis1A: ModelDimensiuniAcoperis1A;
  public dimensiuniAcoperis2A: ModelDimensiuniAcoperis2A;
  public dimensiuniAcoperis4A: ModelDimensiuniAcoperis4A;

  public necesarAccesorii: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private mainService: MainService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.infoTabla = new ModelTabla();
    this.dimensiuniAcoperis1A = new ModelDimensiuniAcoperis1A();
    this.dimensiuniAcoperis2A = new ModelDimensiuniAcoperis2A();
    this.dimensiuniAcoperis4A = new ModelDimensiuniAcoperis4A();

    const receivedParams = this.route.snapshot.queryParams;
    if (Object.keys(receivedParams).length) {
      const {id, tipCalculator} = receivedParams;
      this.getOferta(id, tipCalculator);
    }
  }

  ngAfterViewInit(): void {
    // this.modelsForm.get('brand')?.patchValue('1');
    // this.modelsForm.get('model')?.patchValue('1');

    // this.modelsForm.get('finisaj')?.patchValue('1');

    // this.modelsForm.get('grosime')?.patchValue('1');

    // this.modelsForm.get('culoare')?.patchValue('1');
    //this.cdr.detectChanges();
    //this.isLinear = false;
    // console.log(this.stepper);
    // this.stepper.selectedIndex = 2;
    // this.cdr.detectChanges();

    //this.isLinear = true;

  }

  getModelsForm(event: FormGroup): void {
    this.modelsForm = event;
    this.cdr.detectChanges();

    // console.log(this.modelsForm.value);
  }

  getMeasurementsForm(event: FormGroup): void {
    this.measurementsForm = event;
    this.cdr.detectChanges();

    // console.log(this.measurementsForm.value);
  }

  getInfoFromAccesorii(event: any): void {
    this.infoNecesarAccesorii = event;
    this.cdr.detectChanges();
  }

  getBtnProceedToAccesoriesState(event: boolean) {
    // this.cdr.detectChanges();
    const btnState = event;
    if (btnState) {
      this.sendDataToServer();
    } else {
      return;
    }
  }

  private sendDataToServer() {
    this.createModelInfoTabla();
    switch (this.tipCalculator) {
      case '1A':
        this.createModelDimensiuniCalculator1A();
        this.getAccesorii(
          this.infoTabla,
          this.dimensiuniAcoperis1A,
          this.tipCalculator
        );
        break;
      case '2A':
        this.createModelDimensiuniCalculator2A();
        this.getAccesorii(
          this.infoTabla,
          this.dimensiuniAcoperis2A,
          this.tipCalculator
        );

        break;
      case '4A':
        this.createModelDimensiuniCalculator4A();
        this.getAccesorii(
          this.infoTabla,
          this.dimensiuniAcoperis4A,
          this.tipCalculator
        );
    }
  }

  private getAccesorii(
    infoTabla: ModelTabla,
    infoDimensiuni: any,
    tipCalculator: string
  ) {
    this.loader = true;
    this.mainService
      .getAccesorii(infoTabla, infoDimensiuni, tipCalculator)
      .subscribe({
        next: (accesorii) => {
          this.necesarAccesorii = accesorii;
          //console.log(accesorii);
          this.loader = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        },
      });
  }

  private createModelInfoTabla(): void {
    Object.assign(this.infoTabla, this.modelsForm.value);
  }

  private createModelDimensiuniCalculator1A(): void {
    Object.assign(this.dimensiuniAcoperis1A, this.measurementsForm.value);
  }

  private createModelDimensiuniCalculator2A(): void {
    Object.assign(this.dimensiuniAcoperis2A, this.measurementsForm.value);
  }

  private createModelDimensiuniCalculator4A(): void {
    Object.assign(this.dimensiuniAcoperis4A, this.measurementsForm.value);
  }

  private getOferta(id: string, tipCalculator: string) {
    console.log(tipCalculator);
    this.mainService.getOferta(id).subscribe(({results}: any) => {
      const modele = JSON.parse(results.modele);
      const masuratori = JSON.parse(results.masuratori);

      this.modelsForm.get('brand')?.patchValue(modele.brand);
      this.modelsForm.get('model')?.patchValue(modele.model);
      this.modelsForm.get('finisaj')?.patchValue(modele.finisaj);
      this.modelsForm.get('grosime')?.patchValue(modele.grosime);
      this.modelsForm.get('culoare')?.patchValue(modele.culoare);

      if (tipCalculator === this.tipCalculatorEnum.ACOPERIS_1_APA) {
        this.measurementsForm.get('lungimea_2')?.patchValue(masuratori.lungimea_2);
        this.measurementsForm.get('latimea_3')?.patchValue(masuratori.latimea_3);
        this.measurementsForm.get('inaltimea_1')?.patchValue(masuratori.inaltimea_1);
        this.measurementsForm.get('numarHornuri')?.patchValue(masuratori.numarHornuri);
        this.measurementsForm.get('diametru')?.patchValue(masuratori.diametru);
      } else if (tipCalculator === this.tipCalculatorEnum.ACOPERIS_2_APE) {
        this.measurementsForm.get('inaltimea_1')?.patchValue(masuratori.inaltimea_1);
        this.measurementsForm.get('lungimea_3')?.patchValue(masuratori.lungimea_3);
        this.measurementsForm.get('latimea_4')?.patchValue(masuratori.latimea_4);
        this.measurementsForm.get('latimea_2')?.patchValue(masuratori.latimea_2);
        this.measurementsForm.get('numarHornuri')?.patchValue(masuratori.numarHornuri);
        this.measurementsForm.get('diametru')?.patchValue(masuratori.diametru);
      } else if (tipCalculator === this.tipCalculatorEnum.ACOPERIS_4_APE) {
        this.measurementsForm.get('inaltimea_1')?.patchValue(masuratori.inaltimea_1);
        this.measurementsForm.get('lungimea_2')?.patchValue(masuratori.lungimea_2);
        this.measurementsForm.get('latimea_3')?.patchValue(masuratori.latimea_3);
        this.measurementsForm.get('linia_4')?.patchValue(masuratori.linia_4);
        this.measurementsForm.get('cateta_5')?.patchValue(masuratori.cateta_5);
        this.measurementsForm.get('adancimea_6')?.patchValue(masuratori.adancimea_6);
        this.measurementsForm.get('adancimea_7')?.patchValue(masuratori.adancimea_7);
        this.measurementsForm.get('numarHornuri')?.patchValue(masuratori.numarHornuri);
        this.measurementsForm.get('diametru')?.patchValue(masuratori.diametru);
      }
      this.trigger$.next(JSON.parse(results.accesorii));
      this.isLinear = false;
      this.stepper.selectedIndex = 2;
      this.cdr.detectChanges();
    });
  }
}
