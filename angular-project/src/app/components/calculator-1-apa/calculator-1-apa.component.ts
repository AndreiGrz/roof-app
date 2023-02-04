import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'calculator-1-apa',
  templateUrl: './calculator-1-apa.component.html',
  styleUrls: ['./calculator-1-apa.component.scss']
})
export class Calculator1ApaComponent implements OnInit {

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}