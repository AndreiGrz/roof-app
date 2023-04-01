import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'calculator-personalizat',
  templateUrl: './calculator-personalizat.component.html',
  styleUrls: ['./calculator-personalizat.component.scss']
})
export class CalculatorPersonalizatComponent implements OnInit {
  fileList: File[] = [];
  formData = new FormData();

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  }
  
  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
        this.fileList.push(selectedFile);
        this.formData.append('image[]', selectedFile);
    }
  }

  removeSelectedFile(index: number) {
    this.fileList.splice(index, 1);
  }

  uploadImages() {
    const url = 'http://localhost:3000/api/main/uploadFiles';
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': undefined
      })
    };
    this.http.post(url, this.formData).subscribe();
  }
}