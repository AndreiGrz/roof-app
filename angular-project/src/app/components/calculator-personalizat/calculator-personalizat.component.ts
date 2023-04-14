import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/env';
@Component({
  selector: 'calculator-personalizat',
  templateUrl: './calculator-personalizat.component.html',
  styleUrls: ['./calculator-personalizat.component.scss'],
})
export class CalculatorPersonalizatComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  fileList: File[] = [];
  formData = new FormData();

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
    ) {}

  ngOnInit() {}

  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.formData.append(`image[${i}]`, selectedFile);
    }
  }

  removeSelectedFile(index: number) {
    this.fileList.splice(index, 1);
    this.formData.delete(`image[${index}]`);
  }

  uploadImages() {
    if (!this.fileList.length) {
      return;
    }
    const url = `${environment.apiUrl}/uploadFiles`;
    this.http.post(url, this.formData).subscribe({
      next: () => {
        this.reset();
        this.snackbarService.showSnackBar('Fisiere incarcate cu succes!');
      },
      error: () => {
        this.reset();
        this.snackbarService.showSnackBar('Eroare in incarcarea fisierelor!');
      }
    });
  }

  private reset(): void {
    this.fileList = [];
    this.formData = new FormData();
    this.fileInput.nativeElement.value = '';
  }
}
