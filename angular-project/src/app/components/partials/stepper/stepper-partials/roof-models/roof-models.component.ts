import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Output() formData = new EventEmitter<FormGroup>();
  private alive = true;

  roofImg: string | undefined = '';
  form: FormGroup;
  brands: Options[] = [];
  models: Options[] = [];
  finisaje: Options[] = [];
  grosimi: Options[] = [];
  tempGrosimi: {id: {_id: string, _meta: string}, img_source: string, value: string}[] = [];
  culori: Options[] = [];

  price: string;
  salePrice: string;

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
      this.form.get('culoare')?.patchValue(null, { emitEvent: false });
      this.finisaje = [];
      this.grosimi = [];
      this.culori = [];

      this.roofImg = this.brands.find(brand => brand.id === value)?.img_source;
      console.log('this.brands', this.brands);
      this.mainService.getModels(value).subscribe(models => {
        this.models = models.results.map(res => ({id: res.term_id, value: res.name, img_source: res.guid}));
      });
    });

    this.form.get('model')?.valueChanges.subscribe(value => {
      this.form.get('finisaj')?.patchValue(null, { emitEvent: false });
      this.form.get('grosime')?.patchValue(null, { emitEvent: false });
      this.form.get('culoare')?.patchValue(null, { emitEvent: false });
      this.grosimi = [];
      this.culori = [];

      this.roofImg = this.models.find(model => model.id === value)?.img_source;

      this.mainService.getFinisaje(value).subscribe(finisaje => {
        this.finisaje = finisaje.results.map(res => ({id: res.term_id, value: res.name, img_source: res.guid}));
      });
    });

    this.form.get('finisaj')?.valueChanges.subscribe(value => {
      this.form.get('grosime')?.patchValue(null, { emitEvent: false });
      this.form.get('culoare')?.patchValue(null, { emitEvent: false });
      this.culori = [];
      
      this.price = '';
      this.salePrice = '';

      this.roofImg = this.finisaje.find(finisaj => finisaj.id === value)?.img_source;

      this.mainService.getGrosimi(value).subscribe(grosimi => {
        this.grosimi = grosimi.results.map(res => ({id: res.id, value: res.meta_value.replace('-', '.').replace('-', ' '), img_source: res.guid}));
        this.tempGrosimi = grosimi.results.map(res => ({id: {_id: res.id, _meta: res.meta_value}, value: res.meta_value.replace('-', '.').replace('-', ' '), img_source: res.guid}));
      });
    });

    this.form.get('grosime')?.valueChanges.subscribe(value => {
      this.form.get('culoare')?.patchValue(null, { emitEvent: false });

      this.roofImg = this.grosimi.find(grosime => (grosime.id as {_id: string, _meta: string})._id === value._id)?.img_source;
      
      setTimeout(() => {
        const wantedGrosime = this.tempGrosimi.find(g => g.id._id === value)!.id._meta;
        this.mainService.getCulori(this.form.get('finisaj')?.value, wantedGrosime).subscribe(culori => {
          this.culori = culori.results.map(res => ({id: res.id, value: res.post_title.split(', ')[1], img_source: res.guid}));
        });
  
        this.mainService.getPret(this.form.get('grosime')?.value).subscribe(pret => {
          console.log('pret', pret);
          this.price = pret.results.price;
          this.salePrice = pret.results.salePrice;
        });
      }, 300);
    });

    this.form.get('culoare')?.valueChanges.subscribe(value => {
      this.roofImg = this.culori.find(culoare => culoare.id === value)?.img_source;

      setTimeout(() => {
        this.roofImg = this.culori.find(culoare => culoare.id === value)?.img_source;
      }, 500);
    });

    /////

    this.formData.emit(this.form);
    this.form.valueChanges.subscribe(() => this.formData.emit(this.form));
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}