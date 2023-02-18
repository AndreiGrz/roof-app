import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { Options } from 'src/app/models/models';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'roof-models',
  templateUrl: './roof-models.component.html',
  styleUrls: ['./roof-models.component.scss']
})
export class RoofModelsComponent implements OnInit, OnDestroy {
  private alive = true;

  roofImg: string | undefined = '';
  form: FormGroup;
  brands: Options[] = [];
  models: Options[] = [];
  finisaje: Options[] = [];
  grosimi: Options[] = [];
  culori: Options[] = [
      {id: '0', value: 'Clasic'},
      {id: '1', value: 'Balcanic'},
      {id: '2', value: 'Gotic'},
  ];

  pret: number = 31.4;
  hasOldPrice: boolean = true;

  constructor(private formBuilder: FormBuilder, private mainService: MainService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      brand: this.formBuilder.control(null, [Validators.required]),
      model: this.formBuilder.control(null, [Validators.required]),
      finisaj: this.formBuilder.control(null, [Validators.required]),
      grosime: this.formBuilder.control(null, [Validators.required]),
      culoare: this.formBuilder.control(null, [Validators.required])
    });

    this.mainService.getBrands()
      .pipe(takeWhile(() => this.alive))
      .subscribe(brands => {
        this.brands = brands.results.map(res => ({id: res.term_id, value: res.name, img_source: res.guid}));
      });

    this.form.get('brand')?.valueChanges.subscribe(value => {
      this.form.get('model')?.patchValue(null, { emitEvent: false });
      this.form.get('finisaj')?.patchValue(null, { emitEvent: false });
      this.form.get('grosime')?.patchValue(null, { emitEvent: false });

      this.roofImg = this.brands.find(brand => brand.id === value)?.img_source;

      this.mainService.getModels(value).subscribe(models => {
        this.models = models.results.map(res => ({id: res.term_id, value: res.name, img_source: res.guid}));
      });
    });

    this.form.get('model')?.valueChanges.subscribe(value => {
      this.form.get('finisaj')?.patchValue(null, { emitEvent: false });
      this.form.get('grosime')?.patchValue(null, { emitEvent: false });

      this.roofImg = this.models.find(model => model.id === value)?.img_source;

      this.mainService.getFinisaje(value).subscribe(finisaje => {
        this.finisaje = finisaje.results.map(res => ({id: res.term_id, value: res.name, img_source: res.guid}));
      });
    });

    this.form.get('finisaj')?.valueChanges.subscribe(value => {
      this.form.get('grosime')?.patchValue(null, { emitEvent: false });

      this.roofImg = this.finisaje.find(finisaj => finisaj.id === value)?.img_source;

      this.mainService.getGrosimi(value).subscribe(grosimi => {
        this.grosimi = grosimi.results.map(res => ({id: res.meta_id, value: res.meta_value, img_source: res.guid}));
      });
    });

    this.form.get('grosime')?.valueChanges.subscribe(value => {
      this.roofImg = this.grosimi.find(grosime => grosime.id === value)?.img_source;
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}