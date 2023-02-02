import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator1apa',
  templateUrl: './calculator1apa.component.html',
  styleUrls: ['./calculator1apa.component.scss']
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