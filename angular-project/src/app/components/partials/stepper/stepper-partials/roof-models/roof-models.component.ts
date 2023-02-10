import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options } from 'src/app/models/models';

@Component({
  selector: 'roof-models',
  templateUrl: './roof-models.component.html',
  styleUrls: ['./roof-models.component.scss']
})
export class RoofModelsComponent implements OnInit {
    public form: FormGroup;

    public modele: Options[] = [
        {id: '0', value: 'Clasic'},
        {id: '1', value: 'Balcanic'},
        {id: '2', value: 'Gotic'},
    ];

    public finisaje: Options[] = [
        {id: '0', value: 'Clasic'},
        {id: '1', value: 'Balcanic'},
        {id: '2', value: 'Gotic'},
    ];
    public grosimi: Options[] = [
        {id: '0', value: 'Clasic'},
        {id: '1', value: 'Balcanic'},
        {id: '2', value: 'Gotic'},
    ];
    public culori: Options[] = [
        {id: '0', value: 'Clasic'},
        {id: '1', value: 'Balcanic'},
        {id: '2', value: 'Gotic'},
    ];

    public pret: number = 31.4;
    public hasOldPrice: boolean = true;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        model: this.formBuilder.control('', [Validators.required]),
        finisaj: this.formBuilder.control('', [Validators.required]),
        grosime: this.formBuilder.control('', [Validators.required]),
        culoare: this.formBuilder.control('', [Validators.required]),
      });
  }



}