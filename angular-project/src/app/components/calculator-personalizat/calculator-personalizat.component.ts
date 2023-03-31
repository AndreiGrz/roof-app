import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'calculator-personalizat',
  templateUrl: './calculator-personalizat.component.html',
  styleUrls: ['./calculator-personalizat.component.scss']
})
export class CalculatorPersonalizatComponent implements OnInit {
  fileList: File[] = [];

  constructor() { }
  
  ngOnInit() {
  }
  
  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
        this.fileList.push(selectedFile);
    }
  }

  removeSelectedFile(index: number) {
    this.fileList.splice(index, 1);
  }


}