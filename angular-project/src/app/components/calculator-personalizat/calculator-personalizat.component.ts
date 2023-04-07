import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/env';
@Component({
  selector: 'calculator-personalizat',
  templateUrl: './calculator-personalizat.component.html',
  styleUrls: ['./calculator-personalizat.component.scss'],
})
export class CalculatorPersonalizatComponent implements OnInit {
  fileList: File[] = [];
  formData = new FormData();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

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
    const url = `${environment.apiUrl}/uploadFiles`;
    this.http.post(url, this.formData).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
